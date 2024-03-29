'use client';

import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';
import { ConnectionState, Participant, Track } from 'livekit-client';
import React from 'react'
import OfflineVideo from './component/offline-video';
import LiveVideo from './component/live-video';
import { Skeleton } from '../../ui/skeleton';

type Props = {
    hostName: string;
    hostIdentity: string;
}

export default function Video({
    hostName,
    hostIdentity
}: Props) {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity = hostIdentity);

    let content;

    if (!participant && connectionState === ConnectionState.Connected || tracks.length === 0) {
        content = <OfflineVideo useName={hostName} />
    } else {
        content = <LiveVideo participant={participant as Participant} />
    }

    return (
        <div className='aspect-video border-b group relative'>
            {content}
        </div>
    )
}

export const VideoSkeleton = () => {
    return (
        <div className='aspect-video border-x border-background'>
            <Skeleton className='h-full w-full rounded-none' />
        </div>
    )
}