'use client'

import { useSideBar } from '@/store/use-sidebar';
import { Stream, User } from '@prisma/client';
import React from 'react';
import UserItem, { UserItemSkeleton } from './user-item';

type Props = {
    //data is an array of user and user have a object is stream
    data: (User & {
        Stream: { isLive: boolean; } | null
    })[];
}

export default function Recommended({ data }: Props) {

    const { collapsed } = useSideBar((state) => state)

    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className='pl-6 mb-4'>
                    <p className='text-sm text-muted-foreground'>
                        Recommended
                    </p>
                </div>
            )}
            <ul>
                {data.map((user, key) => (
                    <UserItem
                        key={key}
                        userName={user.username}
                        ImageUrl={user.ImageUrl}
                        isLive={user.Stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    //create array of 3 items with undefined value
    const array = [...Array(3)];

    return (
        <ul className='px-2'>
            {array.map((_, key) => (
                <UserItemSkeleton key={key} />
            ))}
        </ul>
    )
}