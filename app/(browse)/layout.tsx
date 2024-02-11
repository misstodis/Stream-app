import React, { Suspense } from 'react'
import Navbar from './_component/navbar';
import SideBar, { SideBarSkeleton } from './_component/sidbar';
import Container from './_component/container';

type Props = {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                {/* Suspense is used to lazy load the sidebar component
                *  it will show a skeleton UI while the sidebar is loading
                */}
                <Suspense fallback={<SideBarSkeleton />}>
                    <SideBar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}