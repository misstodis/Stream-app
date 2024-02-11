import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
    // const currentUser = await getSelf();

    // this using a fake delay to simulate the network request for skeleton
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const userCollection = db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
        // where: {
        //     NOT: {
        //         externalUserId: currentUser.externalUserId
        //     }
        // }
    });

    return userCollection;
}