'use client'

import { cn } from '@/lib/utils';
import { useDashboardSidebar } from '@/store/use-sidebar-dashboard';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function Wapper({ children }: Props) {
    const { collapsed } = useDashboardSidebar((state) => state);

    return (
        <aside
            className={cn(
                'fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50  transition-width duration-300'
                , collapsed && 'lg:w-[70px]'
            )}
        >
            {children}
        </aside>
    )
}