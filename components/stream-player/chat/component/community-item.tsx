import { onBlock } from '@/actions/block';
import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MinusCircle } from 'lucide-react';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

type CommunityItemProps = {
    hostName: string;
    viewerName: string;
    participantName?: string;
    paricipantIdentity: string;
}

export default function CommunityItem({
    hostName,
    viewerName,
    participantName,
    paricipantIdentity
}: CommunityItemProps) {
    //the fist participant is the host
    //the second participant is the viewer
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const [isPending, startTransition] = useTransition();

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;

        startTransition(() => {
            onBlock(paricipantIdentity)
                .then(() => toast.success(`Blocked user: ${participantName}`))
                .catch((error) => toast.error(`Failed to block user: ${participantName}`));
        });
    };

    return (
        <div className={cn(
            'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p >
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label='Block' asChild>
                    <Button
                        disabled={isPending}
                        variant={'ghost'}
                        className='h-auto w-auto p-1 opacity-0 group-hover:opacity-100'
                        onClick={handleBlock}
                    >
                        <MinusCircle className='w-5 h-5' />
                    </Button>
                </Hint>
            )}
        </div>
    )
}