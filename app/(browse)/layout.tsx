import React from 'react'
import Navbar from './_component/navbar';

type Props = {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
        <>
            <Navbar />
            <div className='flex h-full pt-20'>
                {children}
            </div>
        </>
    )
}