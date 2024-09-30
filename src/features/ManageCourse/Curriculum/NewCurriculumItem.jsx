import { useState } from "react";
import { inputStyle, labelStyle } from "../../../utils/helpers";
import { useParams } from "react-router";
import { useCreateCourseContent } from "../../../reactQuery/course-contents/useCreateCourseContent";

function NewCurriculumItem({ setShowNewItemForm, contents, sectionId }) {
  const [title, setTitle] = useState("");
  const params = useParams();
  const { createCourseContent } = useCreateCourseContent();

  return (
    <div className={`flex w-full flex-col border border-black bg-gray-50`}>
      <div className="flex items-center  gap-x-5 p-3 pb-8">
        <h3 className="text-nowrap text-lg font-bold">New Lecture:</h3>
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
          onClick={() => setShowNewItemForm(false)}
          className="border border-black px-5 py-1 text-lg font-semibold hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            createCourseContent({
              course_id: params.id,
              title,
              section_id: sectionId,
              position:
                contents?.length === 0
                  ? 0
                  : contents[contents?.length - 1]?.position + 1,
            });
            setShowNewItemForm(false);
          }}
          className="border border-black bg-gray-800 px-5 py-1 text-lg font-semibold text-white hover:bg-gray-700"
        >
          Add Lecture
        </button>
      </div>
    </div>
  );
}

export default NewCurriculumItem;
