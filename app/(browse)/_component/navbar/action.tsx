import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import React from 'react'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

type Props = {}

export default async function Action({ }: Props) {
    const user = await currentUser();

    return (
        <div>
            {!user && (
                <SignInButton>
                    <Button
                        variant={'primary'}
                        size={'sm'}
                    >
                        login
                    </Button>
                </SignInButton>
            )}
            {user && (
                <div className='flex items-center gap-x-4'>
                    <Button
                        size={'sm'}
                        variant={'ghost'}
                        className='text-muted-foreground hover:text-primary'
                        asChild
                    >
                        <Link href={`/u/${user.username}`} >
                            <Clapperboard className='h-5 w-5 lg:mr-2' />
                            <span className='hidden lg:block'>Dashboard</span>
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl='/' />
                </div>
            )}
        </div>
    )
}