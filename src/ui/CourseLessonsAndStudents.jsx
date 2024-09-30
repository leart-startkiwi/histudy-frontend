import { faBook, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CourseLessonsAndStudents({ lessons, students }) {
  return (
    <div className="flex items-center gap-x-5">
      <p className="flex items-center gap-x-2 text-nowrap text-sm text-stone-500">
        <FontAwesomeIcon icon={faBook} />
        {lessons} Lessons
      </p>
      <p className="flex items-center gap-x-2 text-nowrap text-sm text-stone-500">
        <FontAwesomeIcon icon={faUsers} />
        {students} Students
      </p>
    </div>
  );
}

export default CourseLessonsAndStudents;
