import { useDispatch, useSelector } from "react-redux";
import { setNewCoursePage } from "../../redux/newCourseSlice";
import { useEffect, useState } from "react";
import { useCreateCourse } from "../../reactQuery/useCreateCourse";

function NewCourseFooter() {
  const { currentPage, totalPages, name, description, category, photo } =
    useSelector((store) => store.newCourse);
  const dispatch = useDispatch();

  const [disabledButton, setDisabledButton] = useState(true);
  const { createCourse } = useCreateCourse();

  useEffect(() => {
    if (
      (currentPage === 1 && !name) ||
      (currentPage === 2 && !description) ||
      (currentPage === 3 && !category) ||
      (currentPage === 4 && !photo)
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [currentPage, name, description, category, photo]);

  return (
    <footer className="shadow-t-md fixed bottom-0 left-0 right-0 flex items-center justify-between bg-white px-10 py-5">
      {currentPage > 1 && (
        <button
          onClick={() => dispatch(setNewCoursePage(currentPage - 1))}
          to="/login"
          className="border border-black px-5 py-2 text-base font-semibold hover:bg-gray-200"
        >
          Previous
        </button>
      )}

      <button
        disabled={disabledButton}
        onClick={() => {
          if (currentPage === totalPages) {
            createCourse({
              name,
              categoryId: category.id,
              photo,
              description: JSON.stringify(description),
            });
          } else {
            dispatch(setNewCoursePage(currentPage + 1));
          }
        }}
        className="border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500"
      >
        {currentPage === totalPages ? "Create Course" : "Continue"}
      </button>
    </footer>
  );
}

export default NewCourseFooter;
