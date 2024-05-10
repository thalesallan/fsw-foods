import { getCategories } from "@/app/_actions/category";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
