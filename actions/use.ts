'use server';

import { getSelf } from "@/lib/auth-service";
import { updateUser } from "@/lib/user-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onUpdateUser = async (values: Partial<User>) => {
    try {
        const currentUser = await getSelf();

        const validData = {
            bio: values.bio,
        }

        const userUpdated = await updateUser(validData, currentUser);

        revalidatePath(`/u/${userUpdated.username}`)
        revalidatePath(`/${userUpdated.username}`)

        return userUpdated;
    } catch (error) {
        throw error;
    }
}