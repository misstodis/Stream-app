import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import SearchResult, { SearchResultSkeleton } from './_component/search-result';

type Props = {
    //get the search term from the query params url
    searchParams: {
        term?: string;
    }
}

export default function SearchPage({
    searchParams
}: Props) {

    //if there is no search term redirect to home page
    if (!searchParams.term) {
        redirect('/');
    }


    return (
        <div className='h-full p-8 max-w-screen-2xl mx-auto'>
            <Suspense fallback={<SearchResultSkeleton />}>
                <SearchResult
                    term={searchParams.term}
                />
            </Suspense>
        </div>
    )
}