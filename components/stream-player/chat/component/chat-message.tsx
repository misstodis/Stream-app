'use client';

import { ReceivedChatMessage } from '@livekit/components-react';
import React from 'react';
import { format } from 'date-fns';

type ChatMessageProps = {
    data: ReceivedChatMessage;
}

export default function ChatMessage({
    data
}: ChatMessageProps) {

    return (
        <div className='flex gap-2 p-2 rounded-sm hover:bg-white/5'>
            <p className='text-sm text-white/40'>
                {format(data.timestamp, 'HH: MM')}
            </p>
            <div className='flex flex-wrap items-baseline gap-1 grow'>
                <p className='text-sm font-semibold whitespace-nowrap'>
                    <span className='truncate'>
                        {data.from?.name}
                    </span>:
                </p>
                <p className='text-sm break-all'>
                    {data.message}
                </p>
            </div>
        </div>
    )
}