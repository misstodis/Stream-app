import { VariantProps, cva } from 'class-variance-authority';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import LiveBadge from './ui/live-badge';
import { Skeleton } from './ui/skeleton';
import { useSideBar } from '@/store/use-sidebar';

interface UserAvatarProps extends VariantProps<typeof avatarSize> {
    userName: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}

const avatarSize = cva("", {
    variants: {
        size: {
            default: "h-8 w-8",
            lg: "h-14 w-14",
            xl: "h-20 w-20"
        },
        default: {
            size: "default"
        },
    },
});

export default function UserAvatar({
    userName,
    imageUrl,
    isLive,
    showBadge,
    size
}: UserAvatarProps) {
    const canShowBadge = showBadge && isLive;

    return (
        <div className='relative'>
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-rose-700 border border-background",
                    avatarSize({ size }),
                )}
            >
                <AvatarImage src={imageUrl} className='object-cover' />
                <AvatarFallback>
                    {userName[0]}
                    {userName[userName.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSize> { };

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn(
            'rounded-full',
            avatarSize({ size })
        )} />
    )
}