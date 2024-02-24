import SideBarDashBoard from '@/app/(dashboard)/_component/sidebar'
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
                isFollwing={true}
            />
        </div>
    )
}