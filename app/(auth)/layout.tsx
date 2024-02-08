import React from 'react'
import Logo from './_components/logo'

type Props = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className='flex flex-col justify-center items-center h-full space-y-6'>
            <Logo />
            {children}
        </div>
    )
}