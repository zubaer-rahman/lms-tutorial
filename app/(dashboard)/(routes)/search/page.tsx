import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import CoursesList from "@/components/courses-list";
import { redirect } from "next/navigation";

interface pageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Page = async ({ searchParams }: pageProps) => {
  const { userId } = auth();
  if (!userId) redirect("/");
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const courses = await getCourses({ userId, ...searchParams });
  return (
    <>
      <div className="px-6 pt-6 md:mb-0 block md:hidden ">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Page;
