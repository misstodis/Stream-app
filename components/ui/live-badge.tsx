import { cn } from '@/lib/utils';
import React from 'react'

interface LiveBadgeProps {
    className?: string;
}


export default function LiveBadge({ className }: LiveBadgeProps) {
    return (
        <div className={cn(
            "bg-red-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wider",
            className
        )}>
            Live
        </div>
    )
}