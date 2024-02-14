'use server'

import { setFollowUser, setUnFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const followUser = await setFollowUser(id);

        //this revalidatePath will revalidate the home page (refresh the data from the server)
        //so when you follow the user this will update the followed user to taskbar
        revalidatePath('/');

        if (followUser) {
            //this will revalidate the user page (refresh the data from the server)
            //this will also revalidate the user page of the user that is being followed
            //update the data of the user that is being followed to page (/username)
            revalidatePath(`/${followUser.following.username}`);
        }

        return followUser;
    } catch (error) {
        throw new Error(`Internal error: ${error}`)
    }
}


export const unFollow = async (id: string) => {
    try {
        const unFollowUser = await setUnFollowUser(id);

        revalidatePath('/');

        if (unFollowUser) {
            revalidatePath(`/${unFollowUser.following.username}`);
        }

        return unFollowUser;
    }
    catch (error) {
        throw new Error(`Internal error: ${error}`)
    }
}