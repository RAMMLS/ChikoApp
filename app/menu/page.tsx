import ChikoExperience from "@/components/ChikoExperience";
import { isMenuCategoryId } from "@/lib/menu-data";

type MenuPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category;
  const initialCategory = category && isMenuCategoryId(category) ? category : "rolls";

  return <ChikoExperience view="menu" initialCategory={initialCategory} />;
}
