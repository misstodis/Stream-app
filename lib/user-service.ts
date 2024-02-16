import { db } from "@/lib/db";
import { UserNotFoundException } from "./exeption/user-service/UserNotFoundException";

export const getUserByName = async (name: string) => {
    const user = await db.user.findUnique({
        where: {
            username: name
        }
    });

    return user;
}

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        }
    });

    if (user === null) {
        throw new UserNotFoundException(`User with id: ${id} not found`);
    }

    return user;
}