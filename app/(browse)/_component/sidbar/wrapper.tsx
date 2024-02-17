'use client'

import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function Wrapper({ children }: Props) {
    const { collapsed } = useSideBar((state) => state);

    return (
        <div>
            <aside
                className={cn(
                    "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50 transition-all duration-300",
                    collapsed && "w-[70px]"
                )}
            >
                {children}
            </aside>
        </div>
    )
}