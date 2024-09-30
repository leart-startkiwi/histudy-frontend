import { useState } from "react";
import { inputStyle, labelStyle } from "../../../utils/helpers";
import { useParams } from "react-router";
import { useCreateCourseSection } from "../../../reactQuery/course-sections/useCreateCourseSection";
import { useSelector } from "react-redux";

function NewSection({ setShowNewSectionForm }) {
  const [title, setTitle] = useState("");
  const params = useParams();
  const { createCourseSection } = useCreateCourseSection();

  const { sections } = useSelector((store) => store.manageCourse);

  return (
    <div className={`flex w-full flex-col border border-black bg-gray-50`}>
      <div className="flex items-center  gap-x-5 p-3 pb-8">
        <h3 className="text-nowrap text-lg font-bold">New Section:</h3>
        <div className="relative w-full">
          <input
            id="title"
            type="text"
            className={inputStyle}
            placeholder=" "
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title" className={labelStyle}>
            Enter Title
          </label>
        </div>
      </div>

      <div className="ms-auto flex items-center gap-x-3 py-5 pr-5">
        <button
          onClick={() => setShowNewSectionForm(false)}
          className="border border-black px-5 py-1 text-lg font-semibold hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            createCourseSection({
              course_id: params.id,
              title,
              position: sections[sections?.length - 1]?.position + 1,
            });
            setShowNewSectionForm(false);
          }}
          className="border border-black bg-gray-800 px-5 py-1 text-lg font-semibold text-white hover:bg-gray-700"
        >
          Add Section
        </button>
      </div>
    </div>
  );
}

export default NewSection;
