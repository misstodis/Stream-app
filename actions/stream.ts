'use server'

import { updateStream } from "@/lib/stream-service";
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache";

export const onUpdateStream = async (value: Partial<Stream>) => {
    try {
        const stream = await updateStream(value);

        if (!stream) {
            throw new Error('Internal error for stream update');
        }

        revalidatePath(`/u/${stream.user.username}/chat`)
        revalidatePath(`/u/${stream.user.username}`)
        revalidatePath(`/${stream.user.username}`)
    } catch (error) {
        throw error;
    }
}