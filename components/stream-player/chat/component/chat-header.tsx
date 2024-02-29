'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import ChatToggle from './chat-toggle';
import ChatToggleVariant from './chat-toggle-variant';

type Props = {}

export default function ChatHeader({ }: Props) {
    return (
        <div className='relative p-3 border-b'>
            {/*toggle chat side bar */}
            <div className='absolute left-2 top-2 hidden lg:block'>
                <ChatToggle />
            </div>

            <p className='font-semibold text-primary text-center'>
                Stream Chat
            </p>

            {/* todo: toggle chat community */}
            <div className='absolute top-2 right-2 block'>
                <ChatToggleVariant />
            </div>

        </div>
    )
}

export const ChatHeaderSkeleton = () => {
    return (
        <div className='relative p-3 border-b hidden md:block'>
            <Skeleton className=' absolute h-6 w-6 left-3 top-4' />
            <Skeleton className='w-28 h-8 mx-auto' />
            <Skeleton className='h-6 w-6 absolute top-4 right-2' />
        </div>
    )
}