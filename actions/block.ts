'use server'

import { setBlockUser, setUnblockeUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    //TODO: Adapt to disconnect from live
    //TODO: Allow ability to kick the guest
    try {
        const blockUser = await setBlockUser(id);

        revalidatePath('/');

        if (blockUser !== null) {
            revalidatePath(`/${blockUser.blocked.username}`);
        }

        return blockUser;
    }
    catch (error) {
        throw error;
    }
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