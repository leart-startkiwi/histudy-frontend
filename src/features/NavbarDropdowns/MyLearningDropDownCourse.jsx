import { Link } from "react-router-dom";
import ProgressBar from "../../ui/ProgressBar";
import { useLastProgress } from "../../reactQuery/last-progress/useLastProgress";

function MyLearningDropDownCourse({ assignedCourse }) {
  const { lastProgress } = useLastProgress();

  const courseLastProgress = lastProgress?.data?.find(
    (progress) => progress?.course_id === +assignedCourse?.course_id,
  );

  return (
    <Link
      to={`/course/${assignedCourse?.course_id}/lecture/${courseLastProgress?.content_id}`}
      className="flex items-center gap-x-3 border-b px-3 py-5"
    >
      <img className="h-16 w-16" src={assignedCourse.course.image} />
      <div className="flex h-16 w-full flex-col justify-between">
        <p className="font-semibold">{assignedCourse.course.name}</p>
        <ProgressBar
          percentage={
            (assignedCourse.progress_count / assignedCourse.content_count) * 100
          }
          height="h-2"
        />
      </div>
    </Link>
  );
}

export default MyLearningDropDownCourse;
