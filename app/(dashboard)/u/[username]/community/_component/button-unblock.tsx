'use client'

import { onUnBlock } from '@/actions/block';
import { Button } from '@/components/ui/button';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

type Props = {
    userId: string;
}

export default function ButtonUnblockUser({
    userId
}: Props) {
    const [isPending, startTransition] = useTransition();

    const handleUnblock = () => {
        startTransition(async () => {
            await onUnBlock(userId)
                .then(() => toast.success('User unblocked'))
                .catch((e) => toast.error(e.message))
        })
    };


    return (
        <Button
            variant={'default'}
            size={"sm"}
            disabled={isPending}
            onClick={handleUnblock}
        >
            Unblock
        </Button>
    )
}