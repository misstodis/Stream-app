'use client'

import { useTracks } from '@livekit/components-react'
import { Participant, Track } from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
import FullscreenControl from './fullscreen-control'
import { useEventListener } from 'usehooks-ts'
import VolumeController from './volum-control'


type LiveVideoProps = {
    participant: Participant
}

export default function LiveVideo({
    participant
}: LiveVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(0);

    const handleFullscreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullScreen);
    };

    useEventListener('fullscreenchange', handleFullscreenChange, wapperRef)

    // this fuction is used to toggle the fullscreen mode
    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        } else if (wapperRef.current) {
            wapperRef.current.requestFullscreen();
            setIsFullscreen(true);
        }
    }


    const onVolumeChange = (value: number) => {
        setVolume(value);
        if (videoRef?.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = value * 0.01;
        }
    }

    const toggleOnMute = () => {
        const isMuted = volume === 0;
        setVolume(isMuted ? 50 : 0);

        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    useEffect(() => {
        onVolumeChange(0);
    }, [])

    //attach the video track to the video element
    useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        })


    return (
        <div className='relative h-full flex' ref={wapperRef}>
            <video width='100%' ref={videoRef} />
            <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
                <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from bg-neutral-900 px-4'>
                    <FullscreenControl
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={toggleFullscreen}
                    />
                    <VolumeController
                        onChange={onVolumeChange}
                        value={volume}
                        onToggleMute={toggleOnMute}
                    />
                </div>
            </div>
        </div>
    )
}