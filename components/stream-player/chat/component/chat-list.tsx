'use client';

import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import ChatMessage from './chat-message';
import { Skeleton } from '@/components/ui/skeleton';

type ChatListProps = {
    recivedChatMessages: ReceivedChatMessage[];
    isHidden: boolean;
}

export default function ChatList({
    recivedChatMessages,
    isHidden,
}: ChatListProps) {
    if (isHidden || !recivedChatMessages || recivedChatMessages.length === 0) {
        return (
            <div className='flex flex-1 items-center justify-center'>
                <p className='text-sm text-muted-foreground'>
                    {isHidden ? 'Chat is disabled!🌑' : 'Welcome to the chat👽'}
                </p>
            </div>
        )
    };

    return (
        <div className='flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full'>
            {recivedChatMessages.map((chatMessage) => (
                <ChatMessage
                    key={chatMessage.timestamp}
                    data={chatMessage}
                />
            ))}
        </div>
    )
}

export const ChatListSkeleton = () => {
    return (
        <div className='flex h-full items-center justify-items-center'>
            <Skeleton className='w-1/2 h-6' />
        </div>
    )
}