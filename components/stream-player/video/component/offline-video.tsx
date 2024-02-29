import { Wifi, WifiOff } from 'lucide-react';
import React from 'react'

type Props = {
    useName: string;
}

export default function OfflineVideo({
    useName
}: Props) {
    return (
        <div className='h-full flex flex-col space-y-4 justify-center items-center'>
            <WifiOff className='h-10 w-10 text-muted-foreground' />
            <p className='font-semibold text-muted-foreground capitalize'>{useName} is offline</p>
        </div>
    )
}