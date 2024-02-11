import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    let userId;

    try {
        const currentUser = await getSelf();
        userId = currentUser.externalUserId;

    } catch (error) {
        userId = null;
        console.log('error', error);
    }

    // this using a fake delay to simulate the network request for skeleton
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let userCollection = [];

    if (userId !== null) {
        userCollection = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                NOT: {
                    externalUserId: userId
                }
            }
        });

        return userCollection;
    }

    userCollection = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return userCollection;
}