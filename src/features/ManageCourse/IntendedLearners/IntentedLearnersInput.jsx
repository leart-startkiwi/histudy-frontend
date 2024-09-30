import { useDispatch } from "react-redux";
import { inputStyle, labelStyle } from "../../../utils/helpers";
import { setHappenedChanges } from "../../../redux/manageCourseSlice";

const objectiveslabelText = (index) => {
  switch (index) {
    case 0:
      return "Example: Define the roles and responsibilities of a project manager";
    case 1:
      return "Example: Estimate project timelines and budgets";
    case 2:
      return "Example: Identify and manage project risks";
    case 3:
      return "Example: Complete a case study to manage a project from conception to completion";

    default:
      return "Example: Define the roles and responsibilities of a project manager";
  }
};

const requirementLabelText = `Example: No programming experience needed. You will learn everything you need to know`;
const intentedLearnerLabelText = `Example: Beginner Python developers curious about data science`;

function IntentedLearnersInput({ id, array, type, customFn }) {
  const dispatch = useDispatch();

  return (
    <div className="relative w-3/4">
      <input
        id={`${type}${id}`}
        type="text"
        className={inputStyle}
        placeholder=" "
        defaultValue={array?.find((objective) => objective.id === id)?.value}
        onBlur={(e) => dispatch(customFn({ value: e.target.value, id: id }))}
        onChange={() => dispatch(setHappenedChanges(true))}
      />
      <label htmlFor={`${type}${id}`} className={labelStyle}>
        {type === "objective"
          ? objectiveslabelText(id)
          : type === "requirement"
            ? requirementLabelText
            : intentedLearnerLabelText}
      </label>
    </div>
  );
}

export default IntentedLearnersInput;
