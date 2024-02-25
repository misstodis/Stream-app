import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import React, { useState } from 'react'

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

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
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
            className='flex flex-col items-center gap-y-4 p-3'
            onSubmit={handleSubmitMessage}
        >
            <div className='w-full flex gap-x-3'>
                <Input
                    onChange={(e) => onChangeMessage(e.target.value)}
                    value={messageValue}
                    disabled={isDisabled}
                    placeholder='Send a message'
                    className={cn(
                        'border-white/10',
                        isFollowersOnly && "rounded-t-none border-t-0"
                    )}
                />
                <div className='ml-auto'>
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