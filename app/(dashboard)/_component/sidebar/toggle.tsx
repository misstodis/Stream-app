'use client'

import Hint from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useDashboardSidebar } from '@/store/use-sidebar-dashboard'
import { ArrowLeftFromLine, ArrowRightFromLineIcon } from 'lucide-react'
import React from 'react'

type Props = {}

export default function Toggle({ }: Props) {
    const { collapsed, onCollapse, onExpand } = useDashboardSidebar((state) => state);

    return (
        <>
            {collapsed && (
                <div className='hidden lg:flex w-full items-center justify-center pt-4 mb-4'>
                    <Hint label='Expand' side='right' asChild>
                        <Button
                            className='h-auto p-2'
                            onClick={onExpand}
                            variant={'ghost'}
                        >
                            <ArrowRightFromLineIcon className='w-4 h-4' />
                        </Button>
                    </Hint>
                </div>
            )}

            {!collapsed && (
                <div className='p-3 pl-6 mb-2 hidden lg:flex items-center w-full'>
                    <p className='font-semibold text-primary'>
                        Dashboard
                    </p>
                    <Hint label='Collapse' side='right' asChild >
                        <Button
                            className='h-auto p-2 ml-auto'
                            onClick={onCollapse}
                            variant={'ghost'}
                        >
                            <ArrowLeftFromLine className='w-4 h-4' />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    )
}