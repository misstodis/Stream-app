import React from 'react';
import Logo from './logo';
import Action from './action';

type Props = {}

export default function NavbarDashBoard({ }: Props) {
    return (
        <nav
            className='fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 
            lg:px-4 flex justify-between items-center shadow-sm'
        >
            <Logo />
            <Action />
        </nav>
    )
}