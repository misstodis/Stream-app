import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { ToggleCardSekeleton } from './_component/toggle-card'

type Props = {}

export default function ChatLoading({ }: Props) {
    return (
        <div className='p-6 space-y-4'>
            <Skeleton className='w-[200px] h-10' />
            <ToggleCardSekeleton />
            <ToggleCardSekeleton />
            <ToggleCardSekeleton />
        </div>
    )
}