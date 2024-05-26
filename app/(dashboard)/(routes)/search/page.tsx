import { db } from "@/lib/db";
import Categories from "./_components/categories";
import { Search } from "lucide-react";
import SearchInput from "@/components/search-input";

const Page = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:mb-0 block md:hidden ">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default Page;
