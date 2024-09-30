import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import SunEditor from "suneditor-react";
import { useCreateQuestion } from "../../../reactQuery/questions/useCreateQuestion";

function NewQuestionForm({ setNewQuestionForm }) {
  const params = useParams();

  const { createQuestion } = useCreateQuestion(params.id);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="mt-10 flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <label className="font-semibold">Title or summary</label>
        <input
          type="text"
          placeholder="e.g. Why do we use useEffect in ReactJs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label className="font-semibold">Details (optional)</label>
        <SunEditor
          placeholder="e.g. At 05:28, I didn't understand this part, here is a screenshot of what I tried..."
          onChange={(details) => setDetails(details)}
          setOptions={{
            buttonList: [
              [
                "bold",
                "italic",
                "underline",
                "strike",
                "fontSize",
                "formatBlock",
                "font",
              ],
              ["fontColor", "hiliteColor", "align", "list", "table"],
              ["codeView", "undo", "redo"],
            ],
          }}
          autoFocus={false}
          height="100px"
        />
      </div>
      <button
        onClick={() => {
          createQuestion(
            {
              course_id: params.id,
              content_id: params.lectureId,
              title,
              details: JSON.stringify(details),
            },
            {
              onSuccess: () => {
                setNewQuestionForm(false);
                toast.success("Question created successfully");
              },
            },
          );
        }}
        className="w-fit border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700"
      >
        Publish
      </button>
    </div>
  );
}

export default NewQuestionForm;
