'use client';

import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { ChatVariant, useChatSideBar } from '@/store/use-chat-sidebar';
import { MessageCircle, MessageCircleHeart } from 'lucide-react';
import React from 'react';

type Props = {
}


export default function ChatToggleVariant({ }: Props) {
    const { variant, onChangeVariant } = useChatSideBar((state) => state)

    const Icon = variant === ChatVariant.CHAT ? MessageCircle : MessageCircleHeart;
    const label = variant === ChatVariant.CHAT ? "All Chat 💩" : "Members 💕";

    const onToggleChangeVariant = () => {
        if (variant === ChatVariant.CHAT) {
            onChangeVariant(ChatVariant.COMMUNITY);
            return;
        }

        onChangeVariant(ChatVariant.CHAT);
    }

    return (
        <div>
            <Hint label={label} side='left' asChild>
                <Button
                    onClick={onToggleChangeVariant}
                    variant={'ghost'}
                    className='h-auto p-2 hover:bg-white/10 hover:text-primary'
                >
                    <Icon className='w-4 h-4' />
                </Button>
            </Hint>
        </div>
    )
}