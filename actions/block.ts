'use server'

import { getSelf } from "@/lib/auth-service";
import { setBlockUser, setUnblockeUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";


const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET_KEY!,
);

export const onBlock = async (id: string) => {
    //TODO: Adapt to disconnect from live
    //TODO: Allow ability to kick the guest

    const currentUser = await getSelf();
    let blockUser;

    try {
        /**
         * try to block the user if the user is not the guest
         * if user is the guest then this do nothing
         */
        blockUser = await setBlockUser(id)
    }
    catch {
        //this mean user is the guest
    }

    try {
        /**
         * Remove the user from the room (guest user of inloged user)
         * removeParticipant(roomName, id user to block)
         * roomName param hier is the inloged user id (host)
         * why roomname is the host id?
         * because in the ingress.ts file we create a room with method CreateIngressOptions
         * with option roomName is currentUser.id
         */
        await roomService.removeParticipant(currentUser.id, id)
    } catch {
        // this mean user is not in this room
    }

    revalidatePath(`/u/${currentUser.username}/community`);

    return blockUser;

}

export const onUnBlock = async (id: string) => {
    try {
        const unblockUser = await setUnblockeUser(id);

        revalidatePath('/');
        if (unblockUser !== null) {
            revalidatePath(`/${unblockUser.blocked.username}`);
        }

        return unblockUser;
    } catch (error) {
        throw error;
    }
}