import { Button } from '@/components/ui/button';
import LiveBadge from '@/components/ui/live-badge';
import { Skeleton } from '@/components/ui/skeleton';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
    userName: string;
    ImageUrl: string;
    isLive?: boolean;
}

export default function UserItem({ userName, ImageUrl, isLive }: Props) {
    //get current path url
    const pathName = usePathname();
    const { collapsed } = useSideBar((state) => state);

    const href = `/${userName}`;
    const isActive = pathName === href;

    return (
        <Button
            asChild
            variant={"ghost"}
            className={cn(
                'w-full h-12',
                collapsed ? 'justify-center' : 'justify-start',
                isActive && "bg-accent"
            )}
        >
            <Link href={href}>
                <div className={cn(
                    'flex items-center w-full gap-x-4',
                    collapsed && 'justify-center'
                )}>
                    <UserAvatar
                        userName={userName}
                        imageUrl={ImageUrl}
                        isLive={isLive}
                    />
                    {!collapsed && (
                        <p className='truncate'>
                            {userName}
                        </p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge className='ml-auto' />
                    )}
                </div>
            </Link>
        </Button>
    )
}

export const UserItemSkeleton = () => {
    return (
        <li className='flex items-center gap-x-4 px-3 py-2'>
            <Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
            <div className='flex-1'>
                <Skeleton className='h-6' />
            </div>
        </li>
    );
};