import AddCategory from "../features/Categories/AddCategory";
import Categories from "../ui/Categories";

function CategoriesPage() {
  return (
    <>
      <Categories from="admin" />
      <AddCategory />
    </>
  );
}

export default CategoriesPage;
