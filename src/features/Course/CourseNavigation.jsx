import CourseNavigationLink from "./CourseNavigationLink";

export const OVERVIEW_LINK = "Overview";
export const Q_A_LINK = "Q&A";
export const ANNOUNCEMENTS_LINK = "Announcements";
export const REVIEWS_LINK = "Reviews";

function CourseNavigation() {
  return (
    <div className={` mt-5 px-3`}>
      <div className="flex items-center gap-x-10 border-b border-gray-300 pb-2 font-bold text-gray-600">
        <CourseNavigationLink text={OVERVIEW_LINK} />
        <CourseNavigationLink text={Q_A_LINK} />
        <CourseNavigationLink text={ANNOUNCEMENTS_LINK} />
        <CourseNavigationLink text={REVIEWS_LINK} />
      </div>
    </div>
  );
}

export default CourseNavigation;
