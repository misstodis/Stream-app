import { useId } from "react";
import { getSelf } from "./auth-service";
import { db } from "./db";

export const getSearch = async (term?: string) => {
    if (!term) {
        return [];
    }

    let userId;

    try {
        const currentUser = await getSelf();
        userId = currentUser.id;
    } catch {
        userId = null;
    }

    let streams = [];


    if (userId) {
        streams = await db.stream.findMany({
            where: {
                //get all streams that are not blocked the current user
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            },
                        },
                    },
                },
                OR: [
                    //search by name of the stream or username of the user
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term,
                            },
                        },
                    },
                ],
            },
            select: {
                user: {
                    select: {
                        username: true,
                        ImageUrl: true
                    }
                },
                name: true,
                thumbnailUrl: true,
                isLive: true,
                id: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                },
            ],
        });
    } else {
        //if user is not logged in (as guest user)
        streams = await db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term,
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term,
                            },
                        },
                    },
                ],
            },
            select: {
                user: {
                    select: {
                        username: true,
                        ImageUrl: true
                    }
                },
                name: true,
                thumbnailUrl: true,
                isLive: true,
                id: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                },
            ],
        });
    }

    return streams;
};