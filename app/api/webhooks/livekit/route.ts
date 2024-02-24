/**
 * create api webhook to livekit
 * when ever the event is ingress_started or ingress_ended this api will update the stream isLive status
 * see setting on: https://cloud.livekit.io/projects/p_3jk1xhw8fzs/settings/webhooks
 */

import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

// create a new instance of WebhookReceiver
const reciver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET_KEY!
);

export async function POST(req: Request) {
    const body = await req.text();
    const headerPayload = headers();

    const authorization = headerPayload.get('Authorization');

    if (!authorization) {
        return new Response('Unauthorized header', { status: 400 });
    }

    const event = await reciver.receive(body, authorization);

    if (event.event === 'ingress_started') {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId
            },
            data: {
                isLive: true
            }
        });
    }

    if (event.event === 'ingress_ended') {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId
            },
            data: {
                isLive: false
            }
        });
    }
}