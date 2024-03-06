import Image from 'next/image';
import React from 'react'
import UserAvatar from './user-avatar';
import { Skeleton } from './ui/skeleton';
import LiveBadge from './ui/live-badge';

type Props = {
    thumbnailUlr: string | null;
    fallbackUrl: string;
    isLive: boolean;
    userName: string;
}

export default function Thumbnaild({
    fallbackUrl,
    isLive,
    thumbnailUlr,
    userName
}: Props) {
    let content;

    if (!thumbnailUlr) {
        content = (
            <div className='bg-background flex flex-col items-center 
                justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md'
            >
                <UserAvatar
                    size={'lg'}
                    showBadge
                    userName={userName}
                    imageUrl={fallbackUrl}
                    isLive={isLive}
                />
            </div>
        )
    }
    else {
        content = (
            <Image
                fill
                alt='thumbnail'
                src={thumbnailUlr}
                className='object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md'
            />
        )
    }

    return (
        <div className='group aspect-video relative rounded-md cursor-pointer'>
            <div className='rounded-md absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center' />
            {content}
            {isLive && thumbnailUlr && (
                <div className='absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform'>
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

export const ThumbnaildSkeleton = () => (
    <div className='group aspect-video relative rounded-xl cursor-pointer'>
        <Skeleton className='h-full w-full' />
    </div>
)
