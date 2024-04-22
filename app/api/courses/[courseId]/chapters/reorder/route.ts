import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Response,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { list } = await req.json();

    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorised", { status: 401 });

    const ownCourse = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!ownCourse) return new NextResponse("Unauthorised", { status: 401 });

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
