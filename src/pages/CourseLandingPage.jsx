import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import ChangeContentIndicators from "../features/Course/Contents/ChangeContentIndicators";
import CourseSidebar from "../features/Course/Contents/CourseSidebar";
import OpenContentPanel from "../features/Course/Contents/OpenContentPanel";
import { useCourse } from "../reactQuery/courses/useCourse";
import CourseContent from "../features/Course/CourseContent";
import { useEffect, useState } from "react";
import { setQuestionContents } from "../redux/questionsSlice";
import { useLastProgress } from "../reactQuery/last-progress/useLastProgress";
import { useCreateLastProgress } from "../reactQuery/last-progress/useCreateLastProgress";
import { useUpdateLastProgress } from "../reactQuery/last-progress/useUpdateLastProgress";
import { useUser } from "../reactQuery/useUser";

function CourseLandingPage() {
  const { showSidebar } = useSelector((store) => store.manageCourse);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [navigated, setNavigated] = useState(false);

  const params = useParams();
  const { lastProgress } = useLastProgress(params?.id);
  const { createLastProgress } = useCreateLastProgress();
  const { updateLastProgress } = useUpdateLastProgress();
  const { course: courseData } = useCourse(params.id);
  const { user } = useUser();

  const courseLastProgress = lastProgress?.data?.find(
    (progress) => progress?.course_id === +params.id,
  );

  // console.log("leart30", courseLastProgress);

  const course = courseData?.data;

  const contents = course?.sections
    ?.map((section) => section?.contents)
    ?.flat();

  let sectionContents = [];

  for (let i = 0; i < contents?.length; i++) {
    const content = contents[i];
    sectionContents.push({ ...content, index: i + 1 });
  }

  const currentContent = sectionContents?.find(
    (contentElement) => contentElement?.id === +params?.lectureId,
  );

  const previousContent = sectionContents?.find(
    (content) => content?.index === currentContent?.index - 1,
  );

  const nextContent = sectionContents?.find(
    (content) => content?.index === currentContent?.index + 1,
  );

  useEffect(() => {
    if (
      course?.published &&
      course?.published === 0 &&
      user?.id !== course?.user_id
    ) {
      navigate(-1);
    }
  }, [course?.published, navigate, course?.user_id, user?.id]);

  useEffect(() => {
    if (!lastProgress?.data?.length) {
      createLastProgress({
        course_id: params.id,
        content_id: params.lectureId,
      });
    } else {
      updateLastProgress({
        id: courseLastProgress?.id,
        updateLastProgressObj: { content_id: params.lectureId },
      });
    }
  }, [
    createLastProgress,
    lastProgress?.data,
    params.id,
    params.lectureId,
    updateLastProgress,
    courseLastProgress?.id,
  ]);

  useEffect(() => {
    if (sectionContents.length) {
      dispatch(setQuestionContents(sectionContents));
    }
  }, [dispatch, sectionContents]);

  useEffect(() => {
    if (
      params.lectureId === "undefined" &&
      course?.first_lecture?.id &&
      !navigated
    ) {
      setNavigated(true);
      navigate(
        `/course/${params.id}/lecture/${course?.first_lecture?.id}/#Overview`,
      );
    } else if (!location.hash) {
      navigate("#Overview", { replace: true });
    }
  }, [
    course?.first_lecture?.id,
    navigate,
    params.id,
    params.lectureId,
    location.hash,
    navigated,
  ]);

  // useEffect(() => {
  //   if (!location.hash ) {
  //     navigate("#Overview", { replace: true });
  //   }
  // }, [navigate, location.hash,]);

  return (
    <>
      <CourseContent course={course} currentContent={currentContent} />
      {showSidebar ? (
        <CourseSidebar course={course} sectionContents={sectionContents} />
      ) : (
        <>
          <OpenContentPanel />
        </>
      )}
      <ChangeContentIndicators
        previousContent={previousContent}
        nextContent={nextContent}
      />
    </>
  );
}

export default CourseLandingPage;
