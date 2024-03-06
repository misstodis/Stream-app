'use client'

import React from 'react'
import qs from 'query-string'
import { useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


type Props = {}

export default function Search({ }: Props) {
    const router = useRouter();
    const [value, setValue] = useState("");

    //when form is submitted (button search is clicked)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) {
            return;
        }

        //create a url with the value of the search bar
        const url = qs.stringifyUrl({
            'url': '/search',
            query: {
                term: value,
            }
        }, { skipEmptyString: true, skipNull: true });

        //pust url to router , in this case is (http://localhost:3000/?term=value)
        router.push(url);
    };

    const onClearSearch = () => {
        setValue("");
    };

    return (
        <form
            onSubmit={(e) => onSubmit(e)}
            className='relative w-full lg:w-[400px] flex items-center transition-all duration-300'
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Search'
                className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
            />
            {/* if value exist (text in search bar) show "X" */}
            {value && (
                <X
                    className='absolute right-14 top-2.5 h-5 w-5 text-muted-foreground hover:opacity-75 transition cursor-pointer'
                    onClick={onClearSearch}
                />
            )}
            <Button
                type='submit'
                size='sm'
                variant={'secondary'}
                className='rounded-l-none'
            >
                <SearchIcon className='h-5 w-5 text-muted-foreground' />
            </Button>
        </form>
    )
}