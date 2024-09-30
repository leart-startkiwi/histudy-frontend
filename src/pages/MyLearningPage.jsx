import MyLearningCourse from "../features/My Learning/MyLearningCourse";
import { useAssignedCourses } from "../reactQuery/assigned-courses/useAssignedCourses";

function MyLearningPage() {
  const { assignedCourses } = useAssignedCourses();

  return (
    <div className="mx-auto my-10 w-3/4 pt-10">
      <div className="flex gap-x-16">
        <div className="w-3/4">
          <h2 className="mb-10 text-4xl font-bold">My learning</h2>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-10">
        {assignedCourses?.data?.map((course) => (
          <MyLearningCourse key={course?.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default MyLearningPage;
