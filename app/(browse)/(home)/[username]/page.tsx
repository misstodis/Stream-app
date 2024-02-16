import NotFound from '@/components/not-found';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByName } from '@/lib/user-service';
import React from 'react'
import Action from './action';
import { isBlockedByUser } from '@/lib/block-service';

type Props = {
    params: {
        // This is a dynamic route this NEED to match with the foler name [username]
        // [username] mean this is a dynamic route
        username: string;
    }
}

export default async function UserPage({ params }: Props) {
    const user = await getUserByName(params.username);

    if (!user) {
        return (
            <NotFound />
        )
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlockedByThisUser = await isBlockedByUser(user.id);

    return (
        <div className='flex flex-col gap-y-4'>
            <p>userName :{user.username}</p>
            <p>userID :{user.externalUserId}</p>
            <p>is following :{`${isFollowing}`}</p>
            <p>is blocked by this user :{`${isBlockedByThisUser}`}</p>

            <Action
                isFollowing={isFollowing}
                userId={user.id}
            />
        </div>
    )
}