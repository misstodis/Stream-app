import NotFound from '@/components/not-found';
import { isFollowingUser } from '@/lib/follow-service';
import { getUserByName } from '@/lib/user-service';
import React from 'react'
import Action from './action';
import { isBlockedByUser } from '@/lib/block-service';
import StreamLayer from '@/components/stream-player';

type Props = {
    params: {
        // This is a dynamic route this NEED to match with the foler name [username]
        // [username] mean this is a dynamic route
        username: string;
    }
}

export default async function UserPage({ params }: Props) {
    const user = await getUserByName(params.username);

    if (!user || !user.Stream) {
        return (
            <NotFound />
        )
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlockedByThisUser = await isBlockedByUser(user.id);

    if (isBlockedByThisUser) {
        return (
            <NotFound />
        )
    }

    return (
        <StreamLayer
            isFollowing={isFollowing}
            user={user}
            stream={user.Stream}
        />
    )
}