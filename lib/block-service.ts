import { User } from "@prisma/client";
import { getSelf } from "./auth-service"
import { db } from "./db"
import { getUserById } from "./user-service";

export const isBlockedByUser = async (id: string) => {

    try {
        const currentUser = await getSelf()
        const otherUser = await getUserById(id);

        if (otherUser.id === currentUser.id) {
            return false;
        }

        const isBlock = await existingBlock(otherUser, currentUser);

        return !!isBlock;

    } catch (error) {
        return false;
    }
}

export const setBlockUser = async (id: string) => {
    try {
        const currentUser = await getSelf();

        if (id === currentUser.id) {
            throw new Error('You cannot block yourself');
        }

        const otherUser = await getUserById(id);

        const isBlock = await existingBlock(currentUser, otherUser);
        console.log(isBlock);

        if (isBlock === true) {
            throw new Error('User already blocked');
        }

        const block = await db.block.create({
            data: {
                blockerId: currentUser.id,
                blockedId: otherUser.id
            },
            include: {
                blocked: true
            }
        })

        return block;
    }
    catch (error) {
        throw error;
    }
}

export const setUnblockeUser = async (id: string) => {
    try {
        const currentUser = await getSelf();

        if (id === currentUser.id) {
            throw new Error('You cannot unblock yourself');
        }

        const otherUser = await getUserById(id);

        const isBlock = await existingBlock(currentUser, otherUser);

        if (isBlock === false) {
            throw new Error('cannot unblock user that is not blocked');
        }

        const unblock = await db.block.delete({
            where: {
                blockerId_blockedId: {
                    blockerId: currentUser.id,
                    blockedId: otherUser.id
                }
            },
            include: {
                blocked: true
            }
        })

        return unblock;

    }
    catch (error) {
        throw error;
    }
}

const existingBlock = async (
    blocker: User, blocked: User
) => {
    const isBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                //người block
                blockerId: blocker.id,
                //người bị block
                blockedId: blocked.id
            }
        }
    })

    return !!isBlock;
}