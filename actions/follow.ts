'use server'

export const onFollow = async (id: string) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        console.log("Followed user with id: ", id);

    } catch (error) {
        throw new Error(`Internal error: ${error}`)
    }
}