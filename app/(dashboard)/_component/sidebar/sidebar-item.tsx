import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDashboardSidebar } from '@/store/use-sidebar-dashboard';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
}

export default function SidBarDashBoardItem({
    label,
    href,
    icon: Icon,
    isActive
}: Props) {

    const { collapsed } = useDashboardSidebar((state) => state);

    return (
        <Button
            variant={"ghost"}
            asChild
            className={cn(
                'w-full h-12',
                collapsed ? 'justify-center' : 'justify-start',
                isActive && 'bg-accent'
            )}
        >
            <Link href={href}>
                <div className='flex items-center gap-x-4'>
                    {/* Icon hier is using alias to make it like component and use it */}
                    <Icon className={cn(
                        'w-4 h-4',
                        collapsed ? 'mr-0' : 'mr-2',
                    )} />
                    {!collapsed && <span>{label}</span>}
                </div>
            </Link>
        </Button>
    )
}