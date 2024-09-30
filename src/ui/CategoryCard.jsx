import {
  faArrowRight,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useModalCloser } from "../hooks/useModalCloser";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Overlay from "./Overlay";
import { useDeleteCategory } from "../reactQuery/useDeleteCategory";
import AddEditCategoryModal from "../features/Categories/AddEditCategoryModal";
import { useUpdateCategory } from "../reactQuery/useUpdateCategory";
import { useNavigate } from "react-router";

function CategoryCard({ category, from }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clickedModal, setClickedModal] = useModalCloser();
  const [clickedUpdateModal, setClickedUpdateModal] = useModalCloser();
  const { deleteCategory } = useDeleteCategory();
  const { updateCategory } = useUpdateCategory();

  const navigate = useNavigate();

  function removeCategory(categoryId) {
    deleteCategory(categoryId);
  }

  const navigateToCoursesPage = (categoryName) => {
    const encodedCategoryName = encodeURIComponent(categoryName);
    navigate(`/courses/?category=${encodedCategoryName}`);
  };

  return (
    <>
      <div
        onClick={() => {
          if (from !== "admin") {
            navigateToCoursesPage(category.name);
          }
        }}
        onMouseEnter={() => {
          if (from === "admin") setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (from === "admin") setIsHovered(false);
        }}
        className={`${from === "admin" && "relative hover:translate-y-0 hover:cursor-auto hover:opacity-60"}  flex transform flex-col items-center gap-y-3 rounded-lg bg-white py-5 shadow-sm hover:-translate-y-2 hover:cursor-pointer md:w-[48%] lg:w-[23%]`}
      >
        <img src={category.icon} className="h-20 w-20" />
        <p className="text-lg font-bold text-black">{category.name}</p>
        <p className="font-medium hover:cursor-pointer hover:text-blue-600">
          {category?.coursesCount} Courses{" "}
          {from !== "admin" && (
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          )}
        </p>

        {isHovered && (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center gap-x-1 rounded-lg border bg-white p-1 text-3xl">
            <div
              onClick={() => setClickedUpdateModal(true)}
              className="rounded-lg px-4 py-2 text-green-700 hover:cursor-pointer hover:bg-blue-200"
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
            <div
              onClick={() => setClickedModal(true)}
              className="rounded-lg px-4 py-2 text-red-700 hover:cursor-pointer hover:bg-blue-200"
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )}
      </div>

      {clickedModal && (
        <>
          <ConfirmDeleteModal
            setClickedModal={setClickedModal}
            title="Category"
            item={category}
            deleteFunction={removeCategory}
          >
            <p>
              Courses with <strong>{category.name}</strong> will remain without
              a category!
            </p>
          </ConfirmDeleteModal>
          <Overlay />
        </>
      )}

      {clickedUpdateModal && (
        <>
          <AddEditCategoryModal
            setClickedModal={setClickedUpdateModal}
            method="Update"
            submitFunction={updateCategory}
            category={category}
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default CategoryCard;
