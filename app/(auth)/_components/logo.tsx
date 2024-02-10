import { Poppins } from 'next/font/google'
import Image from 'next/image'
import React from 'react'
//this cn using to add the font class name in combination wih tailwindcss
import { cn } from '@/lib/utils'

type Props = {}

const font = Poppins({
    subsets: ['latin'],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export default function Logo({ }: Props) {
    return (
        <div className='flex flex-col items-center gap-y-4'>
            <div className='bg-white rounded-full p-1'>
                <Image
                    src={"/ducky.svg"}
                    width={80}
                    height={80}
                    alt="Ducky Hub"
                />
            </div>
            <div className={cn('flex flex-col items-center', font.className)}>
                <p className={"text-xl font-semibold"}>
                    Ducky hub
                </p>
                <p className={"text-sm text-muted-foreground"}>
                    Let&apos;s play
                </p>
            </div>
        </div>
    )
}