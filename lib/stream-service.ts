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