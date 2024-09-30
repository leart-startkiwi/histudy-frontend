import { useState } from "react";
import { useCreateAnnouncement } from "../../reactQuery/announcements/useCreateAnnouncement";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { useParams } from "react-router";
import toast from "react-hot-toast";

function CourseMessages() {
  const params = useParams();
  const [content, setContent] = useState("");
  const { createAnnouncement } = useCreateAnnouncement();

  return (
    <>
      <p>
        Write a brief, engaging announcement to inform students about new course
        updates, such as added lessons, new modules, or upcoming live sessions.
        Mention what the updates are about and encourage students to check them
        out. Include a call to action to keep students motivated and engaged
        with the course content.
      </p>
      <SunEditor
        placeholder="Write an announcement"
        onChange={(content) => setContent(content)}
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
        height="150px"
      />

      <button
        className="-mt-5 mr-5 w-fit border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700"
        onClick={() =>
          createAnnouncement(
            { content, course_id: params.id },
            {
              onSuccess: () => {
                toast.success("Announcement saved successfully!");
              },
            },
          )
        }
      >
        Save Announcement
      </button>
    </>
  );
}

export default CourseMessages;
