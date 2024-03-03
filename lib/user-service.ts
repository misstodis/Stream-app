import { db } from "@/lib/db";
import { UserNotFoundException } from "./exeption/user-service/UserNotFoundException";
import { User } from "@prisma/client";

export const getUserByName = async (name: string) => {
    const user = await db.user.findUnique({
        where: {
            username: name
        },
        include: {
            Stream: true,
            _count: {
                select: {
                    followBy: true,
                },
            },
        },
    });

    return user;
}

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            Stream: true,
        },
    });

    if (user === null) {
        throw new UserNotFoundException(`User with id: ${id} not found`);
    }

    return user;
}

export const updateUser = async (values: Partial<User>, user: User) => {
    const userUpdate = await db.user.update({
        where: {
            id: user.id
        },
        data: {
            ...values
        }
    })

    return user;
};