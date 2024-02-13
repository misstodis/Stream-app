import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

type Props = {
    errorCode?: string;
}

export default function NotFound({
    errorCode
}: Props) {
    return (
        <section className="bg-background py-10 font-serif h-full">
            <div className="container mx-auto">
                <div className="flex flex-col justify-center w-full items-center">
                    <h1 className="text-6xl">
                        {!errorCode ? '404' : errorCode}
                    </h1>
                    <div className="w-full sm:w-10/12 lg:w-8/12 xl:w-6/12">
                        <Image
                            className="h-96 bg-center bg-cover"
                            src={'/notFound.gif'} alt='notFound'
                            width={500}
                            height={500}
                        >
                        </Image>
                        <div className="flex flex-col items-center justify-center gap-y-2">
                            <h3 className=" text-3xl lg:text-5xl">Looks like you&apos;re lost</h3>
                            <p className=" text-sm lg:text-lg">The page you are looking for is not available!</p>
                            <Button
                                asChild
                                variant={'primary'}
                            >
                                <Link href='/'>
                                    Go to Home
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}