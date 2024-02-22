'use client'
import { useSideBar } from '@/store/use-sidebar';
import { Folow, Stream, User } from '@prisma/client'
import React from 'react'
import UserItem, { UserItemSkeleton } from './user-item';

type Props = {
    //data is an array of user and user have a object is stream
    data: (Folow & {
        following: User & {
            Stream: Stream | null
        }
    })[];
}

export default function Following({ data }: Props) {
    const { collapsed } = useSideBar((state) => state);

    if (data.length === 0) {
        return null;
    }

    return (
        <div>
            {!collapsed && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Following
                    </p>

                </div>
            )}
            <ul>
                {data.map((follow, key) => (
                    <UserItem
                        key={key}
                        userName={follow.following.username}
                        ImageUrl={follow.following.ImageUrl}
                        isLive={follow.following.Stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export const FollowingSkeleton = () => {
    return (
        <ul className='px-2 pt-2 lg:p-0'>
            {[...Array(3)].map((_, key) => (
                <UserItemSkeleton key={key} />
            ))}
        </ul>
    )
}