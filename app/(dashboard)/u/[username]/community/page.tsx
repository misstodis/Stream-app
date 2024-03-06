import React from 'react'
import { DataTable } from './_component/data-table'
import { columns } from './_component/columns'
import { getAllBlockedUsers } from '@/actions/block'
import { format } from 'date-fns'

type Props = {}

export default async function Community({ }: Props) {
    const blcokedUsers = await getAllBlockedUsers();

    const formattedData = blcokedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.ImageUrl,
        username: block.blocked.username,
        createdAt: format(new Date(block.createdAt), 'dd/MM/yyyy'),
    }));

    return (
        <div className='p-6'>
            <div className='mb-4'>
                <h1 className='font-semibold text-2xl'>
                    Manage community
                </h1>
            </div>
            <DataTable columns={columns} data={formattedData} />
        </div>
    )
}