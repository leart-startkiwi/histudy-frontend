import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useCreateUserProgress } from "../../reactQuery/user-progress/useCreateUserProgress";
import CourseNavigation, {
  ANNOUNCEMENTS_LINK,
  OVERVIEW_LINK,
  Q_A_LINK,
  REVIEWS_LINK,
} from "./CourseNavigation";
import { useLocation } from "react-router";
import QuestionsAndAnswers from "./Questions/QuestionsAndAnswers";
import Announcements from "./Announcements/Announcements";
import Reviews from "./Reviews/Reviews";
import Overview from "./Overview/Overview";
import { useEffect, useState } from "react";

function CourseContent({ course, currentContent }) {
  const { showSidebar } = useSelector((store) => store.manageCourse);
  const { createUserProgress } = useCreateUserProgress();
  const location = useLocation();
  const locationHash = location.hash.slice(1).toLowerCase();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentContent?.content_type === "article") {
        setTime((time) => time + 30);
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [currentContent?.id, currentContent?.content_type]);

  const duration = currentContent?.duration;

  useEffect(() => {
    if (time >= duration - 30 && currentContent?.content_type === "article") {
      createUserProgress({
        course_id: currentContent?.course_id,
        content_id: currentContent?.id,
      });
    }
  }, [
    currentContent?.course_id,
    duration,
    currentContent?.id,
    time,
    createUserProgress,
    currentContent?.content_type,
  ]);

  return (
    <div className={`${showSidebar ? "w-[78%]" : "w-full"}`}>
      <div
        className={`-mt-7 h-[70vh]`}
        style={{
          backgroundColor:
            currentContent?.content_type === "video" ? "#2d2f31" : "white",
        }}
      >
        {currentContent?.path && currentContent?.content_type === "video" && (
          <ReactPlayer
            onProgress={(e) => {
              if (0.9 * +currentContent?.duration <= e.playedSeconds) {
                createUserProgress({
                  course_id: currentContent.course_id,
                  content_id: currentContent.id,
                });
              }
            }}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            url="http://localhost:8000/videos/contents/content-c629bc6b-bde0-4bc2-83d6-101fd84528e1-1724424727856.mp4"
          />
        )}
        {currentContent?.content_type === "article" && (
          <div className="mx-auto my-10 w-2/3 py-10">
            <h3 className="mb-10 text-3xl font-bold">
              {currentContent?.title}
            </h3>
            <div
              className="px-10"
              dangerouslySetInnerHTML={{ __html: currentContent?.text?.text }}
            ></div>
          </div>
        )}
      </div>
      <CourseNavigation />

      <div
        className={`mx-auto mt-10 ${locationHash !== OVERVIEW_LINK.toLowerCase() ? "w-2/3" : "w-[95%]"}`}
      >
        {locationHash === REVIEWS_LINK.toLowerCase() && (
          <Reviews reviews={course?.reviews} />
        )}
        {locationHash === ANNOUNCEMENTS_LINK.toLowerCase() && <Announcements />}
        {locationHash === Q_A_LINK.toLowerCase() && <QuestionsAndAnswers />}
        {locationHash === OVERVIEW_LINK.toLowerCase() && <Overview />}
      </div>
    </div>
  );
}

export default CourseContent;
