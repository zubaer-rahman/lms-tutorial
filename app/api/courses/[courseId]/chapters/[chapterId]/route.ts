import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const mux = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"], // This is the default and can be omitted
  tokenSecret: process.env["MUX_TOKEN_SECRET"], // This is the default and can be omitted
});
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const ownCourse = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values },
    });

    if (values?.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: { chapterId },
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: { id: existingMuxData.id },
        });
      }
      const asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
        
      });
      await db.muxData.create({
        data: {
          assetId: asset.id,
          chapterId,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTER_ID", error);
    new NextResponse("Internal Error", { status: 500 });
  }
}
