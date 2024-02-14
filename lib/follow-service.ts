import { getSelf } from "./auth-service";
import { db } from "./db";

export const isFollowingUser = async (id: string) => {
    try {
        const currentUser = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error('User not found');
        }

        if (otherUser.id === currentUser.id) {
            return true;
        }

        const existingFollow = await db.folow.findFirst({
            where: {
                followerId: currentUser.id,
                followingId: otherUser.id
            }
        });

        return !!existingFollow;
    } catch {
        return false;
    }
}

export const setFollowUser = async (id: string) => {
    const currentUser = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    });

    if (!otherUser) {
        throw new Error('User not found');
    }

    if (otherUser.id === currentUser.id) {
        throw new Error('You cannot follow yourself');
    }


    const existingFollow = await db.folow.findFirst({
        where: {
            followerId: currentUser.id,
            followingId: otherUser.id,
        }
    });

    if (existingFollow !== null) {
        throw new Error('You are already following this user');
    }

    const follow = await db.folow.create({
        data: {
            followerId: currentUser.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true
        }
    });

    return follow;
}

export const setUnFollowUser = async (id: string) => {
    const currentUser = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    });

    if (!otherUser) {
        throw new Error('User not found');
    }

    if (otherUser.id === currentUser.id) {
        throw new Error('You cannot unfollow yourself');
    }

    const existingFollow = await db.folow.findFirst({
        where: {
            followerId: currentUser.id,
            followingId: otherUser.id,
        }
    });

    if (existingFollow === null) {
        throw new Error('you are not following this user');
    }

    const unfollow = await db.folow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true
        }
    });

    return unfollow;
}

export const getFollowedUsers = async () => {
    try {
        const currentUser = await getSelf();

        const followedUserCollection = await db.folow.findMany({
            where: {
                followerId: currentUser.id
            },
            include: {
                following: true
            }
        });

        return followedUserCollection;
    } catch (error) {
        return [];
    }

}