'use client';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useChatSideBar } from '@/store/use-chat-sidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import React from 'react';

type Props = {
}


export default function ChatToggle({ }: Props) {
    const { collapsed, onCollapse, onExpand } = useChatSideBar((state) => state)

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
    const label = collapsed ? 'Show chat' : 'Hide chat';

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    };

    return (
        <div>
            <Hint label={label} side='left' asChild>
                <Button
                    onClick={onToggle}
                    variant={'ghost'}
                    className='h-auto p-2 hover:bg-white/10 hover:text-primary'
                >
                    <Icon className='w-4 h-4' />
                </Button>
            </Hint>
        </div>
    )
}