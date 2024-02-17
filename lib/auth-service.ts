import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getSelf = async () => {
    // get current user from clerk
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    // find user in database (prisma)
    const user = await db.user.findUnique({
        where: { externalUserId: self.id },
    });

    //if not found user (that mean user not sync with database yet)
    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const getSelfByUserName = async (userName: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    // find user in database (prisma)
    const user = await db.user.findUnique({
        where: { username: userName },
    });

    //if not found user (that mean user not sync with database yet)
    if (!user) {
        throw new Error("User not found");
    }

    if (self.username !== user.username) {
        throw new Error("Unauthorized");
    }

    return user;
}