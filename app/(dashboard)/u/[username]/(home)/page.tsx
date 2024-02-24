import StreamLayer from '@/components/stream-player';
import { getUserByName } from '@/lib/user-service';
import { currentUser } from '@clerk/nextjs';
import React from 'react'

type CreateorPageProps = {
    params: {
        username: string
    };
};

export default async function CreatorPage({ params }: CreateorPageProps) {
    const externalUser = await currentUser();
    const user = await getUserByName(params.username);

    console.log('user', user);
    console.log('externalUser', externalUser);

    if (!user || user.externalUserId !== externalUser?.id
        || !user.Stream
    ) {
        throw new Error('Unauthorized');
    }

    return (
        <div className='h-full'>
            <StreamLayer
                user={user}
                stream={user.Stream}
                isFollowing={true}
            />
        </div>
    )
}