import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCategories } from "../../reactQuery/useCategories";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/searchSlice";

function CategoriesDropdown({ setShowCategoriesDropdown, from }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();

  return (
    <div className="flex w-full flex-col">
      {categories?.data?.map((category) => (
        <React.Fragment key={category.id}>
          {from === "/" ? (
            <Link
              onClick={() => setShowCategoriesDropdown(false)}
              to={`/courses/?category=${encodeURIComponent(category.name)}`}
              className="rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
            >
              {category.name}
            </Link>
          ) : (
            <button
              onClick={() => {
                searchParams.set("category", category.name);
                setSearchParams(searchParams);
                dispatch(setCategory(category));
                setShowCategoriesDropdown(false);
              }}
              className="rounded-md bg-white py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
            >
              {category.name}
            </button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CategoriesDropdown;
