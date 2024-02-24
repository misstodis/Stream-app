import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    let userId;

    try {
        const currentUser = await getSelf();
        userId = currentUser.id;

    } catch (error) {
        userId = null;
        console.log('error', error);
    }

    // this using a fake delay to simulate the network request for skeleton
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let userCollection = [];

    if (userId !== null) {
        //find all user that is not the current user
        userCollection = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId
                        }
                    },
                    {
                        //not recommended user that current login user is already followed
                        NOT: {
                            followBy: {
                                some: {
                                    followerId: userId
                                }
                            }
                        }
                    },
                    {
                        //not recommended user that current login user is already blocked
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId
                                }
                            }
                        }
                    }
                ],
            },
            include: {
                Stream: {
                    select: {
                        isLive: true
                    },
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return userCollection;
    }

    userCollection = await db.user.findMany({
        include: {
            Stream: {
                select: {
                    isLive: true
                },
            },
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return userCollection;
}