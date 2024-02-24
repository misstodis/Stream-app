'use server'

import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";


//hostIdentity is the identity of the host (who is streaming)
export const createViewerToken = async (hostIdentity: string) => {
    let currentUser;

    try {
        currentUser = await getSelf();
    } catch {
        //if the user is not logged in, we will create a guest user
        // with a random username
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`;
        currentUser = { id, username };
    }

    const host = await getUserById(hostIdentity);

    if (!host) {
        throw new Error("Host(user) not found");
    }

    // check if the current user is blocked by the host (streaming user) ?
    const isBlocked = await isBlockedByUser(host.id);

    if (isBlocked) {
        throw new Error("You are blocked by the host");
    }

    //check of the current watched user is the host wacht them self
    const isHost = currentUser.id === host.id;

    // create the token from livekit server.
    const token = await new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET_KEY!,
        {
            /**
             * in the action of create ingress there already have participantIdentity is the host id (the one streaming)
             * so we need to make sure that the viewer identity is unique
             * hier if the host wacth them self we will add the prefix (host- + id) to the identity
             * */
            identity: isHost ? `host-${currentUser.id}` : currentUser.id,
            name: currentUser.username,
        }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    })

    return await Promise.resolve(token.toJwt());
};