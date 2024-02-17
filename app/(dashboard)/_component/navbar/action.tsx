import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


type Props = {}

export default async function Action({ }: Props) {
    return (
        <div className='flex justify-center items-center gap-x-2'>
            <Button
                asChild
                variant={'ghost'}
                className='text-muted-foreground font-bold hover:text-primary'
            >
                <Link href={'/'}>
                    <LogOutIcon className='h-15 w-15 pr-2' />
                    Exit
                </Link>
            </Button>
            <UserButton />
        </div>
    )
}