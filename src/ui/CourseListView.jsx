import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseLessonsAndStudents from "./CourseLessonsAndStudents";
import Stars from "./Stars";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DefaultUserProfile from "./DefaultUserProfile";
import { convertSecondsToMinutes } from "../utils/helpers";
import { useNavigate } from "react-router";
import { useDropdownCloser } from "../hooks/useDropdownCloser";
import HoveredDropdown from "./HoveredDropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/messagesSlice";

function CourseListView({ course, from }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    elementRef: messageDropdownButton,
    showDropdown: showMessageDropdown,
    setShowDropdown: setShowMessageDropdown,
  } = useDropdownCloser();

  return (
    <>
      <div
        className={`${from === "list" ? "w-[85%]" : "w-[70%]"} flex  items-center gap-x-10`}
      >
        <img
          src={course?.image}
          className="h-72 w-[45%] min-w-[45%] rounded-lg border-[14px] border-white shadow-md"
        />
        <div className="flex w-full flex-col gap-y-5">
          <h2
            className={`text-4xl font-bold capitalize hover:cursor-pointer hover:text-blue-600`}
          >
            {course?.name}
          </h2>
          <div className="flex items-center justify-between gap-x-10">
            <Stars
              ratings={course?.avg_rating}
              reviews={course?.reviews_count}
              showNonFilled={true}
            />
            {from === "list" && (
              <p className="w-fit text-nowrap rounded-lg bg-blue-900 px-4 py-1 text-sm font-semibold text-white">
                {convertSecondsToMinutes(course?.duration)}
              </p>
            )}
          </div>
          <CourseLessonsAndStudents
            lessons={course?.content_count}
            students={course?.students_count}
          />
          <div className="relative flex h-14 items-center rounded-lg py-1">
            <DefaultUserProfile
              ref={messageDropdownButton}
              onClick={() => {
                setShowMessageDropdown(!showMessageDropdown);
              }}
              firstName={course?.user?.first_name}
              lastName={course?.user?.last_name}
            >
              {showMessageDropdown && (
                <HoveredDropdown
                  width="w-10"
                  xPadding="px-0"
                  yPadding="py-0"
                  leftPosition="left-0"
                >
                  <div className="z-[50000000000000000000000000000000] flex flex-col">
                    <Link
                      onClick={() =>
                        dispatch(
                          setUser({
                            first_name: course?.user?.first_name,
                            last_name: course?.user?.last_name,
                            userId: course?.user_id,
                          }),
                        )
                      }
                      to="/messages"
                      className="rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
                    >
                      Message
                    </Link>
                  </div>
                </HoveredDropdown>
              )}
            </DefaultUserProfile>
            <p className="ms-5 text-nowrap text-lg font-medium capitalize">
              <span className="font-normal ">By</span>{" "}
              {course?.user?.first_name} {course?.user?.last_name}
            </p>
            {from === "list" && (
              <p className="unselectable ms-auto hover:text-blue-600 hover:underline hover:underline-offset-4">
                Learn More{" "}
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseListView;
