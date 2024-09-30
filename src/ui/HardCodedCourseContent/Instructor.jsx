import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CourseModalBody from "./CourseModalBody";
import { faStar, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Instructor() {
  return (
    <CourseModalBody title="Instructor">
      <div className="flex items-center gap-x-10">
        <img
          src="../../../public/teacher.jpg"
          className="h-52 w-52 rounded-full"
        />
        <div className="flex flex-col gap-y-3">
          <h2 className="text-xl font-bold">Leart Shabani</h2>
          <p className="text-stone-500">Software Developer</p>
          <div className="flex items-center gap-x-3">
            <FontAwesomeIcon icon={faStar} className="text-orange-500" />
            <p className="text-stone-500">75,237 Reviews</p>
            <p className="rounded-md bg-stone-100 p-1 text-xs  font-medium text-stone-500">
              4.4 Rating
            </p>
            <p className="flex items-center gap-x-2 text-nowrap text-sm text-stone-500">
              <FontAwesomeIcon icon={faUsers} />
              912,970 Students
            </p>
            <div className="text-sm text-stone-500">
              <FontAwesomeIcon icon={faVideo} className="me-1" />
              16 Courses
            </div>
          </div>
          <p className="text-stone-500">
            Leart is a brilliant educator, whose life was spent for computer
            science and love of nature.
          </p>
          <div className="mt-2 flex items-center gap-x-5">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-lg duration-0 hover:cursor-pointer hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-lg duration-0 hover:cursor-pointer hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-lg duration-0 hover:cursor-pointer hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-lg duration-0 hover:cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>
      </div>
    </CourseModalBody>
  );
}

export default Instructor;
