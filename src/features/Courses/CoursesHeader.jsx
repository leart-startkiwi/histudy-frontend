import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faGrip,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import NumberOfPaginatedResults from "../../ui/NumberOfPaginatedResults";
import { pageSize } from "../../constants/constants";
import Filters from "./Filters";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter, setFilter } from "../../redux/coursesFilterSlice";
import { setView } from "../../redux/courseViewSlice";

function CoursesHeader({ totalCourses, from }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { filterOpen } = useSelector((store) => store.filterOpen);

  const { courseView } = useSelector((store) => store.courseView);

  const [showFilters, setShowFilters] = useState(false);

  const inputRef = useRef();

  useEffect(function () {
    if (
      filterOpen ||
      searchParams?.has("category") ||
      searchParams.has("language") ||
      searchParams.has("level") ||
      searchParams.has("price")
    ) {
      setShowFilters(true);
      dispatch(setFilter());
    }
  }, []);

  useEffect(
    function () {
      if (!searchParams.has("name")) {
        inputRef.current.value = "";
      }
    },
    [searchParams],
  );

  return (
    <>
      <div className="h-fit min-h-[65vh] bg-gradient-to-br from-white via-blue-500 to-purple-800 px-5">
        <div className="mx-auto -mb-20 flex flex-col gap-y-5 md:w-[80%] lg:gap-y-8">
          <div className="pt-20 md:flex md:items-center md:gap-x-5 lg:pt-32 ">
            <h1 className="text-4xl font-bold ">
              {searchParams?.get("category")} Courses
            </h1>
            <div className="mt-5 w-fit rounded-full border border-white bg-blue-300 px-5 py-3 text-sm font-medium md:mt-0">
              <p>
                <span>🎉</span> {totalCourses} Courses
              </p>
            </div>
          </div>

          {from !== "admin" && (
            <p className="text-lg">
              Courses that help beginners become true unicorns.
            </p>
          )}

          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center gap-x-8">
              <div className="flex w-fit items-center gap-x-1 rounded-full bg-blue-300 p-[0.35rem] shadow-md">
                <p
                  onClick={() => {
                    dispatch(setView("grid"));
                  }}
                  className={`${courseView === "grid" ? "bg-white text-blue-600" : "bg-transparent text-black"} rounded-full px-5 py-2 font-medium hover:cursor-pointer`}
                >
                  <FontAwesomeIcon icon={faGrip} className=" text-sm" /> Grid
                </p>
                <p
                  onClick={() => {
                    dispatch(setView("list"));
                  }}
                  className={`${courseView === "list" ? "bg-white text-blue-600" : "bg-transparent text-black"} rounded-full px-5 py-2 font-medium hover:cursor-pointer`}
                >
                  <FontAwesomeIcon icon={faList} className="me-1 text-sm" />
                  List
                </p>
              </div>
              {/* <NumberOfPaginatedResults
                totalResults={totalCourses}
                pageSize={pageSize}
              /> */}
            </div>

            <div className="mt-5 flex items-center gap-x-7 lg:mt-0">
              <div className="relative w-fit rounded-full  border-2 px-5 py-3 text-white">
                <input
                  ref={inputRef}
                  defaultValue={searchParams?.get("name")}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchParams.set("name", searchQuery);
                      setSearchParams(searchParams);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                      inputRef.current.blur();
                    }
                  }}
                  placeholder="Search Your Course..."
                  className="me-12 bg-transparent outline-none placeholder:font-medium placeholder:text-white"
                />
                <div
                  role="button"
                  onClick={() => {
                    if (searchQuery.length > 0) {
                      searchParams.set("name", searchQuery);
                      setSearchParams(searchParams);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }
                  }}
                  className="absolute right-2 top-3 flex h-7 w-7 transform items-center justify-center rounded-full hover:scale-105 hover:cursor-pointer hover:bg-blue-200"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              </div>

              <button
                onClick={() => {
                  setShowFilters(!showFilters);
                  if (!showFilters) {
                    dispatch(setFilter());
                  } else {
                    dispatch(removeFilter());
                  }
                }}
                className="transform rounded-full bg-white px-5 py-3 font-medium text-black hover:-translate-y-1 hover:bg-blue-300 hover:text-white"
              >
                Filter <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>
          </div>
          {showFilters && <Filters />}
        </div>
      </div>
    </>
  );
}

export default CoursesHeader;
