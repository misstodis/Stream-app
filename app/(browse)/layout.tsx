import React from 'react'
import Navbar from './_component/navbar';
import SideBar from './_component/sidbar';
import Container from './_component/container';

type Props = {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                <SideBar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}