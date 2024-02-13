import { db } from "@/lib/db";

export const getUserByName = async (name: string) => {
    const user = await db.user.findUnique({
        where: {
            username: name
        }
    });

    return user;
}