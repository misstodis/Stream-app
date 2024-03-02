'use client';

import { onUpdateStream } from '@/actions/stream';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import UploadThumbnailImage from './upload-thumbnail-image';

type Props = {
    initialName: string;
    initialThumbnailUrl: string | null;
}

export default function InforModal({
    initialName,
    initialThumbnailUrl
}: Props) {
    const [thumbnailName, setThumbnailName] = useState(initialName);
    const [isPending, startTransition] = useTransition();

    const closeModalRef = useRef<ElementRef<'button'>>(null);

    const OnChangeThumnailName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setThumbnailName(e.target.value);
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            onUpdateStream({ name: thumbnailName })
                .then(() => {
                    toast.success('Stream thunbnail updated');
                    closeModalRef.current?.click();
                }).catch((error) => {
                    toast.error(error.message);
                })
        })

    }

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
                <form className='space-y-14'
                    onSubmit={onSubmitHandler}
                >
                    <div className='space-y-2'>
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder='Enter your stream name...'
                            onChange={OnChangeThumnailName}
                            value={thumbnailName}
                            disabled={isPending}
                        />

                        {/* upload image */}
                        <UploadThumbnailImage
                            inittalThumbnailUrl={initialThumbnailUrl}
                        />

                    </div>
                    <div className='flex justify-between'>
                        <DialogClose asChild>
                            <Button
                                variant={'ghost'}
                                type='button'
                                ref={closeModalRef}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            variant={'primary'}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}