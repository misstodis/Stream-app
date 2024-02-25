'use client'

import { useViewerToken } from '@/hooks/use-viewer-token';
import { Stream, User } from '@prisma/client';
import React from 'react';
import { LiveKitRoom } from '@livekit/components-react';
import Video from './video';
import { useChatSideBar } from '@/store/use-chat-sidebar';
import { cn } from '@/lib/utils';
import Chat from './chat/chat';
import ChatToggle from './chat/_component/chat-toggle';

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

    //create a token for the viewer
    const { token, name, identity } = useViewerToken(user.id);

    //get the state of the chat sidebar
    const { collapsed } = useChatSideBar((state) => state);

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
            {collapsed && (
                <div className='hidden lg:block fixed top-24 right-2 z-50'>
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                token={token}
                className={cn(
                    'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                {/* Video */}
                <div className='space-y-4 col-span-1 lg:col-span-2 xl:col-span-2  2xl:col-span-5 lg:overflow-y-auto pb-10 hidden-scrollbar'>
                    <Video
                        hostName={name}
                        hostIdentity={identity}
                    />
                </div>

                {/* Chat sidebar */}
                <div
                    className={cn(
                        "col-span-1 transition-all duration-300",
                        collapsed && "hidden"
                    )}
                >
                    <Chat
                        hostName={user.username}
                        hostIdentity={user.id}
                        isChatDelayed={stream.isChatDelay}
                        isChatEnabled={stream.isChatEnable}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                        isFollowing={isFollowing}
                        viewerName={name}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}