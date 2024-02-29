import { Check } from 'lucide-react'
import React from 'react'

type Props = {}

export default function VerifiedMark({ }: Props) {
    return (
        <div className='p-0.5 flex items-center justify-center h-4 w-4 bg-blue-600 rounded-full'>
            <Check className='h-[10px] w-[10px] text-primary stroke-[4px]' />
        </div>
    )
}