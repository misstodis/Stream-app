import Thumbnaild from '@/components/thumdnail';
import { Skeleton } from '@/components/ui/skeleton';
import VerifiedMark from '@/components/verified -mark';
import { Stream, User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import React from 'react'

type Props = {
    data: {
        user: {
            username: string;
            ImageUrl: string;
        };
        id: string;
        name: string;
        thumbnailUrl: string | null;
        isLive: boolean;
        updatedAt: Date;
    }
}

export default function SearchResultCard({
    data
}: Props) {
    return (
        <Link
            href={`/${data.user.username}`}
            className='w-fit'
        >
            <div className='flex w-full gap-x-4'>
                <div className='relative h-[9rem] w-[16rem]'>
                    <Thumbnaild
                        isLive={data.isLive}
                        thumbnailUlr={data.thumbnailUrl}
                        userName={data.user.username}
                        fallbackUrl={data.user.ImageUrl}
                        key={data.id}
                    />
                </div>
                <div className='space-y-1'>
                    <div className='flex items-center gap-x-2'>
                        <p className='font-semibold text-lg cursor-pointer hover:text-blue-600 capitalize'>
                            {data.user.username}
                        </p>
                        <VerifiedMark />
                    </div>
                    <p className='text-muted-foreground text-sm'>
                        {data.name}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                        {formatDistanceToNow(
                            new Date(data.updatedAt),
                            {
                                addSuffix: true
                            }
                        )}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const SearchResultCardSkeleton = () => (
    <div className='flex gap-x-4'>
        <Skeleton className=' w-[256px] h-[144px]' />
        <div className='space-y-1'>
            <Skeleton className=' w-36 h-7' />
            <Skeleton className=' w-28 h-7' />
            <Skeleton className=' w-20 h-7' />
        </div>

    </div>
);