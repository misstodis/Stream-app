import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
//this cn using to add the font class name in combination wih tailwindcss
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {}

const font = Poppins({
    subsets: ['latin'],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export default function Logo({ }: Props) {
    return (
        <Link href={"/"}>
            <div className='flex items-center gap-x-4 hover:opacity-75 transition-all duration-300'>
                <div className='bg-white rounded-full p-1 mr-10 shrink-0 lg:mr-0 lg:shrink'>
                    <Image src='/ducky.svg'
                        width={32}
                        height={32}
                        alt='Ducky logo'
                    />
                </div>
                <div className={cn(
                    "hidden lg:block transition-all duration-300",
                    font.className
                )}>
                    <p className='text-lg font-semibold'>
                        Duckyhub
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        Let&apos;s play
                    </p>
                </div>
            </div>
        </Link>
    );
}