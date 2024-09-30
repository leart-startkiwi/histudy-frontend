import { useSelector } from "react-redux";
import {
  COURSE_LANDING_PAGE,
  COURSE_MESSAGES,
  CURRICULUM,
  INTENTED_LEARNERS,
  PRICING,
} from "../../redux/manageCourseSlice";
import Pricing from "./Pricing";
import CourseMessages from "./CourseMessages";
import CourseLandingPage from "./CourseLandingPage/CourseLandingPage";
import IntentedLearners from "./IntendedLearners/IntentedLearners";
import Curriculum from "./Curriculum/Curriculum";

function ManageCourseMainContent() {
  const { activeSidebarLink } = useSelector((store) => store.manageCourse);

  return (
    <div className="w-4/5 border shadow-lg">
      <h2 className="p-8 text-2xl font-bold">{activeSidebarLink}</h2>
      <hr></hr>

      <div className="p-10">
        <div className="flex flex-col gap-y-10">
          {activeSidebarLink === INTENTED_LEARNERS && <IntentedLearners />}
          {activeSidebarLink === CURRICULUM && <Curriculum />}
          {activeSidebarLink === COURSE_LANDING_PAGE && <CourseLandingPage />}
          {activeSidebarLink === PRICING && <Pricing />}
          {activeSidebarLink === COURSE_MESSAGES && <CourseMessages />}
        </div>
      </div>
    </div>
  );
}

export default ManageCourseMainContent;
