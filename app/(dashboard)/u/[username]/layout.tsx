import NotFound from '@/components/not-found';
import { getUserByName } from '@/lib/user-service';
import { redirect } from 'next/navigation';
import React from 'react'
import NavbarDashBoard from '../../_component/navbar';
import SideBarDashBoard from '../../_component/sidebar';
import Container from '../../_component/container';

type Props = {
    children: React.ReactNode;
    params: {
        username: string;
    }
}

export default async function layout({ children, params }: Props) {
    const currentUser = await getUserByName(params.username);

    if (!currentUser) {
        redirect('/');
    }

    return (
        <>
            <NavbarDashBoard />
            <div className='h-full flex pt-20'>
                <SideBarDashBoard />
                <Container>
                    {children}
                </Container>
            </div>
        </>

    )
}