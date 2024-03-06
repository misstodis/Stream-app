import { getSearch } from '@/lib/search-service';
import { log } from 'console';
import React from 'react'
import SearchResultCard, { SearchResultCardSkeleton } from './search-result-card';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    term?: string;
}

export default async function SearchResult({
    term
}: Props) {
    const data = await getSearch(term);

    return (
        <div>
            <h2 className='font-semibold'>
                Result for term &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className='animate-bounce mt-6 text-sm text-muted-foreground'>
                    🦆 No results found 🦆🦆...
                </p>
            )}
            <div className='flex flex-col gap-y-4 mt-3'>
                {data.map((stream) => (
                    <SearchResultCard
                        key={stream.id}
                        data={stream}
                    />
                ))}
            </div>
        </div>
    )
}

export const SearchResultSkeleton = () => (
    <div>
        <Skeleton className='h-8 w-[290px] mb-4' />
        <div className='flex flex-col gap-y-4'>
            {[...Array(4)].map((_, index) => (
                <SearchResultCardSkeleton
                    key={index}
                />
            ))}
        </div>
    </div>
);