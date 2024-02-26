import StreamLayer, { StreamPlayerSkeleton } from '@/components/stream-player'
import React from 'react'

type Props = {}

export default function CreatorLoading({ }: Props) {
    return (
        <div className='h-full'>
            <StreamPlayerSkeleton />
        </div>
    )
}