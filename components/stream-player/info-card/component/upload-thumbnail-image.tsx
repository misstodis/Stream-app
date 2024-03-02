import { onUpdateStream } from '@/actions/stream';
import Hint from '@/components/hint';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/utils/uploadthing';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner';

type Props = {
    inittalThumbnailUrl: string | null;
}

export default function UploadThumbnailImage({
    inittalThumbnailUrl
}: Props) {
    const [thumbnailUrl, setThumbnailUrl] = useState(inittalThumbnailUrl);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onRemoveThumbnail = () => {
        startTransition(() => {
            onUpdateStream({ thumbnailUrl: null })
                .then(() => { toast.success('Thumbnail removed') })
                .catch((error) => {
                    toast.error(error.message);
                });
            setThumbnailUrl(null);
        })
    };

    return (
        <div className='space-y-2'>
            <label>
                Thumbnail
            </label>
            {thumbnailUrl ? (
                <div className='relative aspect-video rounded-xl overflow-hidden border border-white/10'>
                    <div className='absolute top-2 right-2 z-50'>
                        <Hint
                            label='Remove'
                            asChild
                        >
                            <Button
                                size={'sm'}
                                className='p-2'
                                onClick={onRemoveThumbnail}
                                disabled={isPending}
                            >
                                <Trash2 className='w-5 h-5' />
                            </Button>
                        </Hint>
                    </div>
                    <div className='absolute bg-gray-600/35 z-30 w-full h-full'></div>
                    <Image
                        className='object-cover'
                        alt='thumbnail'
                        src={thumbnailUrl}
                        fill
                    />
                </div>
            ) : (
                <div className='border rounded-lg outline-dashed outline-muted'>
                    <UploadDropzone
                        endpoint='thumbnailImageUploader'
                        appearance={{
                            label: {
                                color: '#FFFFFF'
                            },
                            allowedContent: {
                                color: '#FFFFFF'
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            setThumbnailUrl(res?.[0].url);
                            toast.success('Thumbnail image uploaded');
                            router.refresh();
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast.error(`ERROR! ${error.message}`);
                        }}
                    />
                </div>
            )}
        </div >
    )
}