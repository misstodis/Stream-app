
import { Stream } from "@prisma/client";
import { db } from "./db";
import { getSelf } from "./auth-service";

export const getStreamByUserId = async (userId: string) => {

    const stream = db.stream.findUnique({
        where: {
            userId: userId
        }
    })

    if (!stream) {
        throw new Error('Stream not found');
    }

    return stream;
}

export const updateStream = async (value: Partial<Stream>) => {
    try {
        const currentUser = await getSelf();

        const streamOfCurrentUser = await db.stream.findUnique({
            where: {
                userId: currentUser.id
            }
        })

        if (!streamOfCurrentUser) {
            throw new Error('Stream not found');
        }

        const validData = {
            name: value.name,
            isChatEnable: value.isChatEnable,
            isChatFollowersOnly: value.isChatFollowersOnly,
            isChatDelay: value.isChatDelay,
            thumbnailUrl: value.thumbnailUrl
        }

        const stream = await db.stream.update({
            where: {
                id: streamOfCurrentUser.id
            },
            data: {
                ...validData
            },
            include: {
                user: true
            }
        })

        return stream;
    } catch (error) {
        throw error;
    }
}

export const getStreams = async () => {
    let userId;

    try {
        const currentUser = await getSelf();
        userId = currentUser.id;
    }
    catch {
        userId = null;
    }

    let streams = [];

    /**
     * if user logged in,
     *  return all streams that host of stream not blocked this user
     */
    if (userId) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            },
                        },
                    },
                },
            },
            // juist select fields that we need to use
            select: {
                isLive: true,
                id: true,
                name: true,
                thumbnailUrl: true,
                user: {
                    select: {
                        username: true,
                        ImageUrl: true,
                    }
                }
            },
            orderBy: [
                {
                    isLive: 'desc',
                },
                {
                    updatedAt: 'desc'
                }
            ],
        });
    }
    else {
        // return all streams including user of the stream
        streams = await db.stream.findMany({
            select: {
                isLive: true,
                id: true,
                name: true,
                thumbnailUrl: true,
                user: {
                    select: {
                        username: true,
                        ImageUrl: true,
                    }
                }
            },
            orderBy: [
                {
                    isLive: 'desc',
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
    }

    return streams;
}