import Hint from '@/components/hint';
import { Info } from 'lucide-react';
import React, { useMemo } from 'react'

type ChatInfoProps = {
    isDelayed: boolean;
    isFollowersOnly: boolean;
};

export default function ChatInfo({
    isDelayed,
    isFollowersOnly,
}: ChatInfoProps) {

    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return 'Only followers 💕 can chat!';
        }

        if (isDelayed && isFollowersOnly) {
            return 'Only followers can chat, and is 3 seconds delayed!😁';

        }

        if (isDelayed && !isFollowersOnly) {
            return 'Messages is 3 seconds delayed!👻';
        }

        return '';
    }, [isDelayed, isFollowersOnly])

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return 'Followers only chat';
        }

        if (isDelayed && isFollowersOnly) {
            return 'Follower only and slow mode';

        }

        if (isDelayed && !isFollowersOnly) {
            return 'Slow mode';
        }

        return '';
    }, [isDelayed, isFollowersOnly])

    if (!isDelayed && !isFollowersOnly) {
        return null;
    }

    return (
        <div className='p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2'>
            <Hint label={hint}>
                <Info className='w-4 h-4' />
            </Hint>
            <p className='text-xs font-semibold'>
                {label}
            </p>
        </div>
    )
}