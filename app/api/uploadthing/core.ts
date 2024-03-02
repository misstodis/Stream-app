import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { updateStream } from "@/lib/stream-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
// Define as many FileRoutes as you like, each with a unique routeSlug
export const ourFileRouter = {
    // Set permissions and file types for this FileRoute
    thumbnailImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        // This middleware code runs on your server before upload
        .middleware(async ({ req }) => {
            const currentUser = await getSelf();

            return { user: currentUser };
        })
        // This code RUNS ON YOUR SERVER after upload
        .onUploadComplete(async ({ metadata, file }) => {

            // update the thumbnailUrl in the stream table
            await db.stream.update({
                where: { userId: metadata.user.id },
                data: {
                    thumbnailUrl: file.url,
                }
            })

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: (await metadata.user).username };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;