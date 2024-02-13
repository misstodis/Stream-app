'use client'
import { onFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { startTransition, useTransition } from 'react'

type Props = {
    isFollowing: boolean;
}

export default function Action({ isFollowing }: Props) {
    /**
     * useTransition is a React Hook that lets you update the state without blocking the UI
     * in this case this waiting for the onFollow to finish and return false for isPennding
     * and then the button will be enabled
     */
    const [isPennding, startTransition] = useTransition();

    const onClickFollow = () => {
        startTransition(() => {
            onFollow('123');
        })
    }

    return (
        <Button
            disabled={isPennding}
            variant={'primary'}
            onClick={onClickFollow}
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
}