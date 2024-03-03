import { onFollow, unFollow as onUnFollow, unFollow } from '@/actions/follow';
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@clerk/nextjs';
import { Heart, HeartCrack } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

type Props = {
    isFollowing: boolean;
    hostId: string;
    ishost: boolean;
}

export default function ActionFollow({
    isFollowing,
    hostId,
    ishost,
}: Props) {
    const router = useRouter();

    //get the current user
    const { userId } = useAuth();
    const [isPending, startTransition] = useTransition();

    const toggleFollow = () => {
        // check if the user is logged in before following
        // if not redirect to the sign in page
        if (!userId) {
            return router.push('/sign-in');
        }

        if (ishost) return;

        startTransition(() => {
            if (isFollowing) {
                handleOnUnFollow();
            }
            else {
                handleOnFollow();
            }
        })
    }


    const handleOnFollow = () => {
        const follow = onFollow(hostId);
        follow.then((res) => { toast.success(`You are following ${res.follower.username} `) })
            .catch((error) => {
                toast.error(`${error}`)
            })
    }

    const handleOnUnFollow = () => {
        const unFollow = onUnFollow(hostId);
        unFollow.then((res) => { toast.success(`You are unfollowing ${res.following.username}`) })
            .catch((error) => {
                toast.error(`${error}`)
            })
    }

    return (
        <>
            <Button
                className='w-full lg:w-auto lg:right-0 font-semibold'
                variant={ishost ? 'outline' : 'primary'}
                size={'sm'}
                onClick={toggleFollow}
                disabled={ishost || isPending}
            >
                {isFollowing ? (
                    <HeartCrack className='fill-red-500' />
                ) : (
                    <Heart className='fill-red-500' />
                )}

                {isFollowing ? (
                    <p>Unfollow</p>
                ) : (
                    <p>Follow</p>
                )}
            </Button>
        </>

    )
}

export const ActionFollowSkeleton = () => {
    return (
        <Skeleton className='w-full h-10 lg:w-24' />
    )
}