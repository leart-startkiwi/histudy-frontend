import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCourse } from "../../../reactQuery/courses/useCourse";
import {
  setInitialIntentedLearnerData,
  setIntentedLearners,
  setObjectives,
  setRequirements,
} from "../../../redux/manageCourseSlice";
import IntentedLearnersInput from "./IntentedLearnersInput";

function IntentedLearners() {
  const dispatch = useDispatch();
  const params = useParams();
  const { course } = useCourse(params.id);

  const { outcomes, requirements, intented_learners } = useSelector(
    (store) => store.manageCourse,
  );

  const [objectiveArrayLength, setObjectiveArrayLength] = useState(4);
  const [requirementsArrayLength, setRequirementsArrayLength] = useState(1);
  const [intentedLearnersArrayLength, setIntentedLearnersArrayLength] =
    useState(1);

  const courseObjectives = course?.data?.outcomes;
  const courseRequirements = course?.data?.requirements;
  const courseIntentedLearners = course?.data?.intented_learners;

  const objectivesArray = Array.from(
    { length: objectiveArrayLength },
    (_, i) => ({ id: i }),
  );
  const requirementsArray = Array.from(
    { length: requirementsArrayLength },
    (_, i) => ({ id: i }),
  );
  const intentedLearnersArray = Array.from(
    { length: intentedLearnersArrayLength },
    (_, i) => ({ id: i }),
  );

  useEffect(() => {
    dispatch(
      setInitialIntentedLearnerData({
        outcomes: courseObjectives || [],
        requirements: courseRequirements || [],
        intented_learners: courseIntentedLearners || [],
      }),
    );
    setObjectiveArrayLength(courseObjectives?.length || 4);
    setRequirementsArrayLength(courseRequirements?.length || 1);
    setIntentedLearnersArrayLength(courseIntentedLearners?.length || 1);
  }, [courseObjectives, dispatch, courseRequirements, courseIntentedLearners]);

  return (
    <>
      <p>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </p>
      <div>
        <h4 className="text-lg font-semibold ">
          What will students learn in your course?
        </h4>
        <p>
          You must enter at least 4 learning objectives or outcomes that
          learners can expect to achieve after completing your course.
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        {objectivesArray.map((objective) => (
          <IntentedLearnersInput
            key={objective.id}
            id={objective.id}
            array={outcomes}
            customFn={setObjectives}
            type="objective"
          />
        ))}
        <p
          onClick={() => {
            setObjectiveArrayLength(objectiveArrayLength + 1);
          }}
          className="font-semibold text-purple-600"
          role="button"
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </p>
      </div>
      <div>
        <h4 className="mt-5 text-lg font-semibold ">
          What are the requirements or prerequisites for taking your course?
        </h4>
        <p>
          List the required skills, experience, tools or equipment learners
          should have prior to taking your course. If there are no requirements,
          use this space as an opportunity to lower the barrier for beginners.
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        {requirementsArray.map((requirement) => (
          <IntentedLearnersInput
            key={requirement.id}
            id={requirement.id}
            array={requirements}
            customFn={setRequirements}
            type="requirement"
          />
        ))}
        <p
          onClick={() => {
            setRequirementsArrayLength(requirementsArrayLength + 1);
          }}
          className="font-semibold text-purple-600"
          role="button"
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </p>
      </div>
      <div>
        <h4 className="mt-5 text-lg font-semibold ">Who is this course for?</h4>
        <p>
          Write a clear description of the intended learners for your course who
          will find your course content valuable. This will help you attract the
          right learners to your course.
        </p>
      </div>
      <div className="flex flex-col gap-y-3">
        {intentedLearnersArray.map((intentedLearner) => (
          <IntentedLearnersInput
            key={intentedLearner.id}
            id={intentedLearner.id}
            array={intented_learners}
            customFn={setIntentedLearners}
            type="intented_learners"
          />
        ))}
        <p
          onClick={() => {
            setIntentedLearnersArrayLength(intentedLearnersArrayLength + 1);
          }}
          className="font-semibold text-purple-600"
          role="button"
        >
          <FontAwesomeIcon icon={faPlus} /> Add more to your response
        </p>
      </div>
    </>
  );
}

export default IntentedLearners;
