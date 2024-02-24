import { Maximize, Minimize } from 'lucide-react';
import React from 'react'
import Hint from '../hint';

type Props = {
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
}

export default function FullscreenControl({
    isFullscreen,
    onToggleFullscreen
}: Props) {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';

    return (
        <div className='flex items-center justify-center gap-4'>
            <Hint label={label} asChild>
                <button
                    onClick={onToggleFullscreen}
                    className='text-white p-1.5 hover:bg-white/10 rounded-lg'
                >
                    <Icon className='h-5 w-5' />
                </button>
            </Hint>
        </div>
    )
}