import UserAvatar from '@/components/user-avatar';
import VerifiedMark from '@/components/verified -mark';
import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { EyeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import ActionFollow, { ActionFollowSkeleton } from './component/Action-follow';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    imageUrl: string;
    isFollowing: boolean;
    streamName: string;
}

export default function HeaderStreamLayer({
    hostName,
    hostIdentity,
    viewerIdentity,
    imageUrl,
    isFollowing,
    streamName,
}: Props) {
    const participantCollection = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participantCollection.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;


    return (
        <>
            <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
                <div className='flex items-center gap-x-3'>
                    <UserAvatar
                        imageUrl={imageUrl}
                        userName={hostName}
                        size={'lg'}
                        isLive={isLive}
                        showBadge
                    />

                    <div className='space-y-1'>
                        <div className=' flex items-center gap-x-2'>
                            <h2 className='text-lg font-semibold'>
                                {hostName}
                            </h2>
                            <VerifiedMark />
                        </div>
                        <p className='text-sm font-semibold'>
                            {streamName}
                        </p>
                        {isLive ? (
                            <div className='flex items-center gap-x-1 text-green-400'>
                                <EyeIcon
                                    className='h-4 w-4'
                                />
                                <p className='font-semibold text-sm'>
                                    {participantCount}
                                    {participantCount === 1 ? ' viewer' : ' viewers'}
                                </p>
                            </div>

                        ) : (
                            <p className='font-semibold text-muted-foreground text-sm'>
                                offline
                            </p>
                        )}
                    </div>
                </div>
                <ActionFollow
                    isFollowing={isFollowing}
                    hostId={hostIdentity}
                    ishost={isHost}
                />
            </div>
        </>

    )
}

export const HeaderStreamLayerSkeleton = () => {
    return (
        <div className='flex flex-col lg:flex-row px-4 gap-y-3 justify-between'>
            <div className='flex gap-x-3'>
                <Skeleton className='w-16 h-16 rounded-full' />
                <div className='flex flex-col gap-y-3'>
                    <Skeleton className='w-28 h-6' />
                    <Skeleton className='w-24 h-6' />
                    <Skeleton className='w-16 h-6' />
                </div>

            </div>

            <ActionFollowSkeleton />
        </div>

    )
}