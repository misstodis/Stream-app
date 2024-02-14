import React from 'react'
import Wrapper from './wrapper'
import Toggle, { ToggleSkeleton } from './toggle'
import { getRecommended } from '@/lib/recommeded-service'
import Recommended, { RecommendedSkeleton } from './recommended'
import { getFollowedUsers } from '@/lib/follow-service'
import Following, { FollowingSkeleton } from './following'

type Props = {}

export default async function SideBar({ }: Props) {
    //fetch recommended user
    const recommended = await getRecommended();
    //fetch followed user
    const follow = await getFollowedUsers();

    return (
        <Wrapper>
            <Toggle />
            <div className='space-y-4 pt-4 lg:pt-0'>
                <Following data={follow} />
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    )
}

export const SideBarSkeleton = () => {
    return (
        <aside className='
        fixed left-0 flex flex-col w-[70px] lg:w-60 h-full 
        bg-background border-r border-[#2D2E35] z-50'
        >
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    )
};