'use client'

import { useViewerToken } from '@/hooks/use-viewer-token';
import { Stream, User } from '@prisma/client'
import React from 'react'

type StreamLayerProps = {
    user: User & { Stream: Stream | null };
    stream: Stream;
    isFollwing: boolean;
}

export default function StreamLayer({
    user,
    stream,
    isFollwing
}: StreamLayerProps) {

    const { token, name, identity } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        return (
            <div>
                Cannot watch this stream
            </div>
        );

    }
    return (
        <div>StreamLayer</div>
    )
}