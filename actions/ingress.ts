"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import {
    type CreateIngressOptions,
    IngressInput,
    RoomServiceClient,
    IngressVideoEncodingPreset,
    TrackSource,
    IngressVideoOptions,
    IngressAudioEncodingPreset,
    IngressAudioOptions,
    IngressClient
} from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET_KEY!,
);

const ingressClient = new IngressClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET_KEY!
);

export const resetIngress = async (hostIdentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
}

export const creatIngress = async (ingressType: IngressInput) => {
    const currentUser = await getSelf();

    //when creating a new ingress, we need to reset the old one
    await resetIngress(currentUser.id);

    const options: CreateIngressOptions = {
        name: currentUser.username,
        roomName: currentUser.id,
        participantName: currentUser.username,
        participantIdentity: currentUser.id,
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true;
    } else {
        options.video = {
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            }
        } as IngressVideoOptions;

        options.audio = {
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            }
        } as IngressAudioOptions;
    };

    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error('Failed to create ingress');
    }

    await db.stream.update({
        where: {
            userId: currentUser.id
        },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
        }
    });

    revalidatePath(`/u/${currentUser.username}/keys}`);

    return ingress;
}