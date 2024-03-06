import Thumbnaild, { ThumbnaildSkeleton } from '@/components/thumdnail'
import { Skeleton } from '@/components/ui/skeleton'
import UserAvatar, { UserAvatarSkeleton } from '@/components/user-avatar'
import Link from 'next/link'
import React from 'react'

type Props = {
    data: {
        id: string;
        name: string;
        thumbnailUrl: string | null;
        isLive: boolean;
        user: {
            username: string;
            ImageUrl: string;
        }
    }
}

export default function ResultCard({
    data
}: Props) {
    return (
        <Link
            href={`/${data.user.username}`}
        >
            <div className='h-full w-full space-y-4' >
                <Thumbnaild
                    thumbnailUlr={data.thumbnailUrl}
                    fallbackUrl={data.user.ImageUrl}
                    isLive={data.isLive}
                    userName={data.user.username}
                />
                <div className='flex gap-x-3'>
                    <UserAvatar
                        userName={data.user.username}
                        imageUrl={data.user.ImageUrl}
                        isLive={data.isLive}
                    />
                    <div className='flex flex-col text-sm overflow-hidden'>
                        <p className='truncate font-semibold hover:text-blue-500'>
                            {data.name}
                        </p>
                        <p className='text-sm font-semibold text-muted-foreground'>
                            {data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => (
    <div className='h-full w-full space-y-4'>
        <ThumbnaildSkeleton />
        <div className='flex gap-x-3'>
            <UserAvatarSkeleton />
            <div className='flex flex-col gap-y-1'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-23' />
            </div>
        </div>
    </div>
);