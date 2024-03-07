import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-react'
import Image from 'next/image';
import React from 'react'
import InforModal from './component/info-modal';

type Props = {
    streamName: string;
    thumbnailUrl: string | null;
    hostIdentity: string;
    viewerIdentity: string;
}

export default function InfoCard({
    streamName,
    thumbnailUrl,
    hostIdentity,
    viewerIdentity,
}: Props) {

    const hostIdentityToken = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostIdentityToken;

    if (isHost === false) {
        return;
    }

    return (
        <div className='px-4'>
            <div className='rounded-xl bg-background'>
                <div className='flex items-center gap-x-2.5 p-4'>
                    <div className='bg-blue-700 p-2 rounded-lg'>
                        <Pencil className='w-5 h-5' />
                    </div>
                    <div>
                        <h2 className='font-semibold text-sm lg:text-lg capitalize'>
                            Edit your stream info
                        </h2>
                        <p className='text-muted-foreground text-xs lg:text-sm'>
                            Maximize your visbility
                        </p>
                    </div>

                    {/* Add modal button */}
                    {isHost && (
                        < InforModal
                            initialName={streamName}
                            initialThumbnailUrl={thumbnailUrl}
                        />
                    )}

                </div>
                <Separator />
                <div className='p-4 lg:p-6 space-y-4'>
                    <div>
                        <h3 className='text-sm text-muted-foreground mb-2'>
                            Name
                        </h3>
                        <p className='text-sm font-semibold'>
                            {streamName}
                        </p>
                    </div>

                    <div>
                        <h3 className='text-sm text-muted-foreground mb-2'>
                            Thumbnail
                        </h3>
                        {thumbnailUrl && (
                            <div className='relative aspect-video rounded-md overflow-hidden w-[200px] border-white/10'>
                                <Image
                                    alt='thumbnail'
                                    src={thumbnailUrl}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}