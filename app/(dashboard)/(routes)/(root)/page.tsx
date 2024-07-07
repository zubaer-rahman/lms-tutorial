import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>{/* TODO: Info Card */}</div>
        <div>{/* TODO: Info Card */}</div>
      </div>
    </div>
  );
}
