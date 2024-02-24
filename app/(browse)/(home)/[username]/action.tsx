'use client'
import { onBlock, onUnBlock } from '@/actions/block'
import { onFollow, unFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

type Props = {
    isFollowing: boolean;
    userId: string;
}

export default function Action({ isFollowing, userId }: Props) {
    /**
     * useTransition is a React Hook that lets you update the state without blocking the UI
     * in this case this waiting for the onFollow to finish and return false for isPennding
     * and then the button will be enabled
     */
    const [isPennding, startTransition] = useTransition();

    const onFollowHandler = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You are now following ${data.following.username} `))
                .catch(() => toast.error('Something went wrong'));
        });
    }

    const unfollowHandler = () => {
        startTransition(() => {
            unFollow(userId)
                .then((data) => toast.success(`You are unfollow ${data.following.username} `))
                .catch(() => toast.error('Something went wrong'));
        });
    }

    const onBlockHandler = () => {
        startTransition(() => {
            onUnBlock(userId).then((data) => toast.success(`You are now unblocking ${data.blocked.username}`))
                .catch((error) => toast.error(error.message));
        });
    }

    return (
        <>
            <Button
                disabled={isPennding}
                variant={'primary'}
                onClick={isFollowing ? unfollowHandler : onFollowHandler}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>


            <Button
                disabled={isPennding}
                variant={'default'}
                onClick={onBlockHandler}
            >
                Block
            </Button>
        </>
    )
}