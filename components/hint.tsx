import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    label: string;
    children: React.ReactNode;
    asChild?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export default function Hint({
    label, children, asChild, side, align
}: Props) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className='text-black bg-white'
                    side={side}
                    align={align}
                >
                    <p className='font-semibold'>
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}