import React from 'react'

type Props = {
    params: {
        // This is a dynamic route this NEED to match with the foler name [username]
        // [username] mean this is a dynamic route
        username: string;
    }
}

export default function UserPage({ params }: Props) {
    return (
        <div>User: {params.username}</div>
    )
}