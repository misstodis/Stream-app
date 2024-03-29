import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { UserPayloadType } from '@/Type/auth/UserPayloadType'
import { resetIngress } from '@/actions/ingress'

/**
 * this hook is called when a user is created, updated or deleted
 * and it syncs the user with the database (mysql databse)
 * but if you want it working you need to deploy it to a server (example: ngrok)
 * if you don't this won't sync the user from clerk to the your database
 */
export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload: UserPayloadType = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        // Create a new user in the database (sync with clerk user)
        await db.user.create({
            data: {
                externalUserId: payload.data.id,
                username: payload.data.username,
                ImageUrl: payload.data.image_url,
                Stream: {
                    create: {
                        name: `${payload.data.username}'s stream`,
                    }
                }
            }
        })
    }

    if (eventType === "user.updated") {
        const currentUser = await db.user.findUnique({
            where: {
                externalUserId: payload.data.id,
            }
        })

        if (!currentUser) {
            return new Response('Error occured -- user not found', { status: 400 })
        }

        await db.user.update({
            where: {
                externalUserId: payload.data.id,
            },
            data: {
                username: payload.data.username,
                ImageUrl: payload.data.image_url,
            }
        })
    }

    if (eventType === "user.deleted") {
        removeUserFromDatabase(payload);
    }

    return new Response('', { status: 200 })
}

async function removeUserFromDatabase(payload: UserPayloadType) {
    const currentUser = await db.user.findUnique({
        where: {
            externalUserId: payload.data.id
        }
    })

    if (!currentUser) {
        return new Response('Error occured -- user not found', { status: 400 })
    }

    // reset the ingress when use is deleted
    await resetIngress(payload.data.id);

    await db.user.delete({
        where: {
            externalUserId: payload.data.id
        }
    })

    return new Response('', { status: 200 })
}

