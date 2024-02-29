'use client'

import { onUpdateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

type FieldType = 'isChatEnable' | 'isChatDelay' | 'isChatFollowersOnly';

type Props = {
    field: FieldType;
    label: string;
    value: boolean;
}

export default function ToggleCard({
    field,
    label,
    value = false
}: Props) {
    const [isPending, startTransition] = useTransition();

    const onChangeStreamUpdateHandler = async () => {
        startTransition(() => {
            // when value true, it will be false and vice versa
            onUpdateStream({ [field]: !value })
                .then(() => {
                    toast.success('Chat setting updated successfully!')
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        });
    }

    return (
        <div className='flex justify-between bg-background p-6 rounded-xl mb-5'>
            <p className='font-semibold shrink-0'>{label}</p>

            <div className='space-y-2'>
                <Switch
                    disabled={isPending}
                    onCheckedChange={onChangeStreamUpdateHandler}
                    checked={value}
                >
                    {value ? 'On' : 'Off'}
                </Switch>
            </div>
        </div>
    )
}

export const ToggleCardSekeleton = () => {
    return (
        <div>
            <Skeleton className='w-full h-[76px] rounded-xl mb-5' />
        </div>
    );
}