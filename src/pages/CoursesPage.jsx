import { useSearchParams } from "react-router-dom";
import CoursesHeader from "../features/Courses/CoursesHeader";
import CoursesList from "../features/Courses/CoursesList";
import { useCourses } from "../reactQuery/useCourses";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../reactQuery/useCategories";
import { useEffect, useRef, useState } from "react";
import { resetSkip, setCategory, setSkip } from "../redux/searchSlice";

function CoursesPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { categories } = useCategories();
  const { category, skip } = useSelector((store) => store.search);
  const urlCategory = searchParams?.get("category");

  const [allCourses, setAllCourses] = useState([]);
  const prevSearchParams = useRef(null);

  const { courses } = useCourses({
    name: searchParams?.get("name"),
    categoryId: category?.id,
    price: searchParams?.get("price"),
    language: searchParams?.get("language"),
    level: searchParams?.get("level"),
    sort: searchParams?.get("sort"),
    skip,
  });

  useEffect(() => {
    if (urlCategory) {
      dispatch(
        setCategory(
          categories?.data?.find((category) => category?.name === urlCategory),
        ),
      );
    }
  }, [categories?.data, dispatch, urlCategory]);

  useEffect(() => {
    const currentParams = searchParams.toString();
    if (prevSearchParams.current !== currentParams) {
      setAllCourses([]);
      dispatch(resetSkip());
      prevSearchParams.current = currentParams;
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (courses?.data?.courses?.length) {
      setAllCourses((prevCourses) => {
        const newCourses = courses.data.courses.filter(
          (newCourse) =>
            !prevCourses.some((course) => course.id === newCourse.id),
        );

        return [...prevCourses, ...newCourses];
      });
    } else if (skip === 0) {
      setAllCourses([]);
    }
  }, [courses?.data?.courses, courses?.data?.courses?.length, skip]);

  return (
    <>
      <CoursesHeader totalCourses={courses?.data?.totalResults} />
      <CoursesList courses={allCourses} />
      {allCourses.length < courses?.data?.totalResults && (
        <button
          onClick={() => dispatch(setSkip())}
          className="mx-auto flex w-1/4 items-center justify-center border border-black px-5 py-2 font-semibold hover:bg-gray-200"
        >
          Show more
        </button>
      )}
    </>
  );
}

export default CoursesPage;
