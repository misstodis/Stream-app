import { Button } from '@/components/ui/button'
import React from 'react'
import UrlCard from './_component/url-card'
import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import KeyCard from './_component/key-card'
import ConnectModal from './_component/connect-modal'

type Props = {}

export default async function KeysPage({ }: Props) {
    const currentUser = await getSelf();
    const stream = await getStreamByUserId(currentUser.id);

    if (!stream) {
        throw new Error('Stream not found');
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold'>
                    Keys & URLs
                </h1>
                <ConnectModal />
            </div>
            <div className='space-y-4'>
                <UrlCard
                    value={stream.serverUrl}
                />
                <KeyCard
                    value={stream.streamKey}
                />
            </div>
        </div>
    )
}