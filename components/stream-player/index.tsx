'use client'

import { useViewerToken } from '@/hooks/use-viewer-token';
import { Stream, User } from '@prisma/client';
import React from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import Video from './video';

type StreamLayerProps = {
    user: User & { Stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export default function StreamLayer({
    user,
    stream,
    isFollowing
}: StreamLayerProps) {

    const { token, name, identity } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        return (
            <div>
                {/* todo: make some funny gif page */}
                Cannot watch this stream
            </div>
        );

    }
    return (
        <>
            <LiveKitRoom
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                token={token}
                className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'
            >
                <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2  2xl:col-span-5 lg:overflow-y-auto pb-10 hidden-scrollbar'>
                    <Video
                        hostName={name}
                        hostIdentity={identity}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}