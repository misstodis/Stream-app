'use client'

import { Button } from '@/components/ui/button'
import { CheckIcon, CopyIcon } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    value?: string
}

export default function CopyButton({ value }: Props) {
    const [isCopyed, setIsCopyed] = useState(false);

    const onCopy = () => {
        if (!value) return;

        setIsCopyed(true);

        //set text to clipboard when click on copy button this value will be copied to clipboard
        navigator.clipboard.writeText(value);

        setTimeout(() => {
            setIsCopyed(false);
        }, 1000);

    }

    const Icon = isCopyed ? CheckIcon : CopyIcon;

    return (
        <Button
            onClick={onCopy}
            disabled={!value || isCopyed}
            variant={'ghost'}
            size={'sm'}
        >
            <Icon
                size={20}
            />
        </Button>
    )
}