'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';

type Props = {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export default function InforModal({ }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'link'} size={'sm'} className='ml-auto'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit your stream info
                    </DialogTitle>
                </DialogHeader>
                <form className='space-y-14'>
                    <div className='space-y-2'>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}