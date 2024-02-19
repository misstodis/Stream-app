'use client'

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import CopyButton from './copy-button'
import { Button } from '@/components/ui/button'

type Props = {
    value: string | null
}

export default function KeyCard({ value }: Props) {
    const [isShow, setIshow] = useState(false)

    return (
        <div className='bg-muted rounded-xl p-6'>
            <div className='flex gap-x-10 items-start'>
                <p className='font-semibold shrink-0 pt-2'>
                    Stream key
                </p>
                <div className='space-y-2 w-full'>
                    <div className='w-full flex items-center gap-x-2'>
                        <Input
                            placeholder='Key stream'
                            type={isShow ? 'text' : 'password'}
                            value={value || ''}
                            disabled
                        />
                        <CopyButton value={value || ''} />
                    </div>
                    <Button
                        size={'sm'}
                        variant={'link'}
                        onClick={() => setIshow(!isShow)}
                    >
                        {isShow ? 'Hide' : 'Show'}
                    </Button>
                </div>
            </div>
        </div>
    )
}