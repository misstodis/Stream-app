import { Input } from '@/components/ui/input'
import React from 'react'
import CopyButton from './copy-button'

type Props = {
    value: string | null
}

export default function UrlCard({
    value
}: Props) {
    return (
        <div className='bg-muted p-6 rounded-xl'>
            <div className='flex items-center gap-x-10'>
                <p className='font-semibold shrink-0'>
                    Server URL
                </p>
                <div className='w-full flex items-center gap-x-2'>
                    <Input
                        value={value || ''}
                        disabled
                        placeholder='Server URL'
                    />
                    <CopyButton
                        value={value || ''}
                    />
                </div>
            </div>
        </div>
    )
}