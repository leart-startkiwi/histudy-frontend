import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import ProgressBar from "../../ui/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { resetNewCourseData } from "../../redux/newCourseSlice";

function NewCourseNavbar() {
  const { currentPage, totalPages } = useSelector((store) => store.newCourse);
  const dispatch = useDispatch();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
      <nav className="flex items-center px-3 py-5 md:px-10">
        <Logo />
        <div className="ms-10 flex flex-1 items-center justify-between">
          <p className="text-lg">
            Step {currentPage} of {totalPages}
          </p>
          <Link
            onClick={() => dispatch(resetNewCourseData())}
            to="/instructor/courses"
            className="font-bold text-purple-600"
          >
            Exit
          </Link>
        </div>
      </nav>
      <ProgressBar percentage={(currentPage / totalPages) * 100} />
    </header>
  );
}

export default NewCourseNavbar;
