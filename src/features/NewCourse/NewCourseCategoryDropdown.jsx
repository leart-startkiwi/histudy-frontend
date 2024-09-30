import { useDispatch } from "react-redux";
import { useCategories } from "../../reactQuery/useCategories";
import { setNewCourseCategory } from "../../redux/newCourseSlice";

function NewCourseCategoryDropdown({ setShowCategoriesDropdown }) {
  const { categories } = useCategories();

  const dispatch = useDispatch();

  return (
    <div className="flex w-full flex-col">
      {categories?.data?.map((category) => (
        <button
          key={category.id}
          onClick={() => {
            dispatch(setNewCourseCategory(category));
            setShowCategoriesDropdown(false);
          }}
          className="rounded-md bg-white py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default NewCourseCategoryDropdown;
