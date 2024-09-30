import ManageCourseMainContent from "../features/ManageCourse/ManageCourseMainContent";
import Sidebar from "../features/ManageCourse/Sidebar";

function ManageCoursePage() {
  return (
    <div className="mx-auto flex w-3/4 gap-x-5">
      <Sidebar />
      <ManageCourseMainContent />
    </div>
  );
}

export default ManageCoursePage;
