import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradientButton from "../../ui/GradientButton";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSE_LANDING_PAGE,
  COURSE_MESSAGES,
  CURRICULUM,
  INTENTED_LEARNERS,
  PRICING,
  setActiveSidebarLink,
  setInitialLandingPageData,
} from "../../redux/manageCourseSlice";
import { useCourse } from "../../reactQuery/courses/useCourse";
import { useParams } from "react-router";
import { useUpdateCourse } from "../../reactQuery/useUpdateCourse";
import { useEffect } from "react";
import { useModalCloser } from "../../hooks/useModalCloser";
import Overlay from "../../ui/Overlay";
import ModalXCloser from "../../ui/ModalXCloser";

const completedSection = (condition) => {
  if (condition) {
    return <FontAwesomeIcon icon={faCircleCheck} className="mr-2" />;
  } else {
    return <FontAwesomeIcon icon={faCircle} className="mr-2" />;
  }
};

function Sidebar() {
  const dispatch = useDispatch();
  const { activeSidebarLink } = useSelector((store) => store.manageCourse);
  const params = useParams();
  const { course } = useCourse(params.id);
  const { updateCourse } = useUpdateCourse();

  const [clickedModal, setClickedModal] = useModalCloser();

  const {
    outcomes,
    requirements,
    intented_learners,
    name,
    description,
    skillLevel,
    category,
    language,
  } = useSelector((store) => store.manageCourse);

  const sidebarLinkStyle = (link) => {
    return `${activeSidebarLink === link && "border-l-[6px] border-black"} py-3 ps-5 hover:cursor-pointer hover:bg-gray-100`;
  };

  const intentedLearnersCondition =
    outcomes.length >= 4 &&
    requirements.length >= 1 &&
    intented_learners.length >= 1;

  const curriculumCondition = Boolean(
    course?.data?.sections?.length && course?.data?.content_count,
  );

  const courseLandingPageCondition = Boolean(
    name && description && skillLevel && category && language,
  );

  const priceCondition = Boolean(course?.data?.price);

  useEffect(() => {
    dispatch(
      setInitialLandingPageData({
        name: course?.data?.name || "",
        description: course?.data?.description || "",
        language: course?.data?.language || null,
        category: course?.data?.category || null,
        skillLevel: course?.data?.skillLevel || null,
      }),
    );
  }, [course?.data, dispatch]);

  return (
    <div className="flex w-1/5 flex-col gap-y-4">
      <h3 className="ps-5 text-lg font-semibold">Plan your course</h3>
      <div
        onClick={() => dispatch(setActiveSidebarLink(INTENTED_LEARNERS))}
        className={sidebarLinkStyle(INTENTED_LEARNERS)}
      >
        {completedSection(intentedLearnersCondition)}
        {INTENTED_LEARNERS}
      </div>
      <div
        onClick={() => dispatch(setActiveSidebarLink(CURRICULUM))}
        className={sidebarLinkStyle(CURRICULUM)}
      >
        {completedSection(curriculumCondition)} {CURRICULUM}
      </div>
      <div
        onClick={() => dispatch(setActiveSidebarLink(COURSE_LANDING_PAGE))}
        className={sidebarLinkStyle(COURSE_LANDING_PAGE)}
      >
        {completedSection(courseLandingPageCondition)}
        {COURSE_LANDING_PAGE}
      </div>
      <div
        onClick={() => dispatch(setActiveSidebarLink(PRICING))}
        className={sidebarLinkStyle(PRICING)}
      >
        {completedSection(priceCondition)} {PRICING}
      </div>
      <div
        onClick={() => dispatch(setActiveSidebarLink(COURSE_MESSAGES))}
        className={sidebarLinkStyle(COURSE_MESSAGES)}
      >
        <FontAwesomeIcon icon={faCircle} className="mr-2" /> {COURSE_MESSAGES}
      </div>

      <div className="mt-8 ps-5">
        <GradientButton
          customFn={() => {
            if (
              !course?.data?.published &&
              (!intentedLearnersCondition ||
                !curriculumCondition ||
                !courseLandingPageCondition ||
                !priceCondition)
            ) {
              setClickedModal(true);
              return;
            }
            updateCourse({
              id: course.data.id,
              updateCourseObj: { published: course.data.published ? 0 : 1 },
            });
          }}
          text={course?.data?.published ? "Unpublish" : "Publish Course"}
          move={false}
        />
      </div>
      {clickedModal && (
        <>
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[500000] h-full w-full bg-stone-50 p-10 shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-[85%] lg:w-1/3 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg"
          >
            <div className="mb-7 flex">
              <p className="-mt-3 text-lg font-bold">
                Why can&apos;t I submit for review?
              </p>
              <ModalXCloser setClickedModal={setClickedModal} />
            </div>
            <p>
              You&apos;re almost ready to submit your course. Here are a few
              more items you need.
            </p>
            <div className="ms-6 mt-5 flex flex-col gap-y-3">
              {!intentedLearnersCondition && <IntentedLearnersReason />}
              {!curriculumCondition && <CurriculumReason />}
              {!courseLandingPageCondition && <CourseLandingReason />}
              {!priceCondition && <PricingReason />}
            </div>
            <p className="mt-10">
              Once you complete these steps, you will be able to successfully
              submit your course for review.
            </p>
          </div>
          <Overlay />
        </>
      )}
    </div>
  );
}

const IntentedLearnersReason = () => {
  return (
    <ul>
      On the Intended learners page, you must
      <li className="my-2 ms-8 list-disc">
        Specify what students will learn in this course
      </li>
      <li className="my-2 ms-8 list-disc">
        Specify any course requirements or prerequisites
      </li>
      <li className="my-2 ms-8 list-disc">Specify who this course if for</li>
    </ul>
  );
};

const CurriculumReason = () => {
  return (
    <ul>
      On the Curriculum page, you must
      <li className="my-2 ms-8 list-disc">
        At least have a section with some content in it
      </li>
    </ul>
  );
};

const CourseLandingReason = () => {
  return (
    <ul>
      On the Course landing page page, you must
      <li className="my-2 ms-8 list-disc">Have a course title</li>
      <li className="my-2 ms-8 list-disc">Have a course description</li>
      <li className="my-2 ms-8 list-disc">
        Select the category of your course
      </li>
      <li className="my-2 ms-8 list-disc">Select the level of your course</li>
    </ul>
  );
};

const PricingReason = () => {
  return (
    <ul>
      On the Pricing page, you must
      <li className="my-2 ms-8 list-disc">Select a price for your course</li>
    </ul>
  );
};

export default Sidebar;
