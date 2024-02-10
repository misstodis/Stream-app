'use client'

import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts';

import { cn } from '@/lib/utils';
import { useSideBar } from '@/store/use-sidebar';

type Props = {
    children: React.ReactNode;
}

export default function Container({ children }: Props) {
    const { collapsed, onCollapse, onExpand } = useSideBar((state) => state);

    /**
     * from library usehooks-ts
     * this use to check if the screen is mobile or not
     * if the screen is mobile then the sidebar will be collapsed
     * if creen > 1024px return false
     * if screen < 1024px return true
     */
    const matches = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (matches) {
            onCollapse();
            return;
        }

        onExpand();
    }, [matches, onCollapse, onExpand]);

    return (
        <div className={cn(
            "flex-1",
            collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
        )}>
            {children}
        </div>
    )
}