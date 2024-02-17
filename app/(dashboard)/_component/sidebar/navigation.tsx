'use client'

import { useUser } from '@clerk/nextjs';
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation'
import React from 'react'
import SidBarDashBoardItem from './sidebar-item';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

export default function Navigation({ }: Props) {
    //get current path
    const pathName = usePathname();
    //get user
    const { user } = useUser();

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ]

    if (!user?.username) {
        return (
            <ul>
                {[...Array(4)].map((_, index) => (
                    <NavigationSkeleton key={index} />
                ))}
            </ul>
        )
    }

    return (
        <div>
            <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
                {routes.map((route, index) => (
                    <SidBarDashBoardItem
                        label={route.label}
                        href={route.href}
                        icon={route.icon}
                        isActive={pathName === route.href}
                        key={route.href}
                    />
                ))}
            </ul>
        </div>
    );
};

export const NavigationSkeleton = () => {
    return (
        <li className='flex items-center gap-x-4 px-3 py-2'>
            <Skeleton className='min-h-[48px] min-w-[48px] rounded-md' />
            <div className='flex-1 hidden lg:block'>
                <Skeleton className='min-h-[30px] w-full' />
            </div>
        </li>
    )
};

