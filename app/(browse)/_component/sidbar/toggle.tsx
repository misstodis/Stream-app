"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSideBar } from '@/store/use-sidebar';
import Hint from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

export default function Toggle({ }: Props) {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSideBar((state) => state);

    const label = collapsed ? "Expand" : "Collapse"

    return (
        <>

            {collapsed && (
                <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
                    <Hint label={label} side='right' asChild>
                        <Button
                            variant={"ghost"}
                            className={'h-auto p-2'}
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine className='w-4 h-4' />
                        </Button>
                    </Hint>
                </div>
            )}

            {!collapsed && (
                <div className='p-3 pl-6 mb-2 flex items-center w-full'>
                    <p className='font-semibold text-primary'>
                        For you
                    </p>
                    <Hint label={label} side='right' asChild >
                        <Button
                            className='h-auto p-2 ml-auto'
                            variant={"ghost"}
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine
                                className='w-4 h-4'
                            />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className='p-3 pl-6 mb-2 pr-5 hidden lg:flex justify-between items-center w-full'>
            <Skeleton className='w-20 h-5' />
            <Skeleton className='w-6 h-6' />
        </div>
    )
}