import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import React, { useState } from 'react'
import ChatInfo from './chat-info';

type ChatFormProps = {
    onSubmitMessage: () => void;
    messageValue: string;
    onChangeMessage: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isFollowing: boolean;
    isDelayed: boolean;
}

export default function ChatForm({
    onSubmitMessage,
    messageValue,
    onChangeMessage,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed,
}: ChatFormProps) {

    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    //if the chat is on mode followert only and the user is not following the host
    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

    /**
     * dissable the chat
     * if host not live = isHidden
     * if delay = true
     * if on followers only mode and the user is not following the host
     */
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!messageValue || isDisabled) {
            return;
        }

        if (isDelayed && isDelayBlocked === false) {
            setIsDelayBlocked(true);

            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmitMessage();
            }, 3000);
        } else {
            onSubmitMessage();
        }
    }

    if (isHidden) {
        return null;
    }

    return (
        <form
            className='flex flex-col items-center p-3'
            onSubmit={handleSubmitMessage}
        >
            <div className='w-full flex gap-x-3'>
                <div className='w-full'>
                    <ChatInfo
                        isDelayed={isDelayed}
                        isFollowersOnly={isFollowersOnly}
                    />
                    <Input
                        onChange={(e) => onChangeMessage(e.target.value)}
                        value={messageValue}
                        disabled={isDisabled}
                        placeholder='Send a message'
                        className={cn(
                            'border-white/10',
                            (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
                        )}
                    />
                </div>
                <div className='ml-auto mt-auto'>
                    <Hint label='Send' side='top' asChild>
                        <Button
                            variant={'primary'}
                            size={'sm'}
                            type='submit'
                        >
                            <Send className='w-4 h-4' />
                        </Button>
                    </Hint>
                </div>
            </div>
        </form>
    )
}

export const ChatFormSkekeleton = () => {
    return (
        <div className='flex items-center gap-y-4 p-3'>
            <div className='flex w-full items-center gap-x-3 ml-auto'>
                <Skeleton className='w-full h-10' />
                <Skeleton className='h-10 w-12' />
            </div>
        </div>
    );
};