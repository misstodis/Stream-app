import React from 'react'
import ModalEditAboutCard from './component/modal-edit-about-card';
import VerifiedMark from '@/components/verified -mark';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    hostName: string;
    bio: string | null;
    hostIdentity: string;
    viewerIdentity: string;
    followedByCount: number;
}

export default function AboutCard({
    hostName,
    bio,
    hostIdentity,
    viewerIdentity,
    followedByCount
}: Props) {
    const HostIdentityToken = `host-${hostIdentity}`;
    const isHost = HostIdentityToken === viewerIdentity;
    const followedLabel = followedByCount === 1 ? ' follower' : ' followers';

    return (
        <div className='px-4'>
            <div className='group rounded-xl bg-background flex flex-col p-6 lg:p-10 gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
                        About {hostName} <VerifiedMark />
                    </div>
                    {isHost && (
                        <ModalEditAboutCard
                            inititalBio={bio}
                        />
                    )}
                </div>
                <div className='text-sm text-muted-foreground'>
                    <span className='font-semibold text-primary'>
                        {followedByCount}
                    </span>
                    {followedLabel}
                </div>
                <p>
                    {bio || 'No bio available'}
                </p>
            </div>
        </div>
    )
}