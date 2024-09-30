import { useDispatch } from "react-redux";
import { inputStyle, labelStyle } from "../../../utils/helpers";

function CourseLandingInput({ id, label, value, customFn }) {
  const dispatch = useDispatch();
  return (
    <div className="relative w-full">
      <input
        id={id}
        type="text"
        className={inputStyle}
        placeholder=" "
        defaultValue={value}
        onBlur={(e) => dispatch(customFn(e.target.value))}
      />
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
    </div>
  );
}

export default CourseLandingInput;
