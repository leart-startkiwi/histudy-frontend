import { faCirclePlay, faFile } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewContent } from "../../../redux/manageCourseSlice";
import { useUpdateCourseContent } from "../../../reactQuery/course-contents/useUpdateCourseContent";
import SunEditor from "suneditor-react";
import { isTextEmpty } from "../../../utils/helpers";
import GeneralDropdownContainer from "../GeneralDropdownContainer";

function NewContent({
  contentId,
  setCurrentActionText,
  setShowContentDetails,
  setShowNewContentForm,
  showArticle,
  existingText,
  existingArticleDuration,
}) {
  const [newContentType, setNewContentType] = useState(null);

  useEffect(() => {
    if (!newContentType) {
      setCurrentActionText("Select content type");
    }
  }, [newContentType, setCurrentActionText]);

  useEffect(() => {
    if (showArticle) {
      setNewContentType("article");
      setCurrentActionText("Add Article");
    }
  }, [showArticle, setCurrentActionText]);

  return (
    <div className="border-t border-black bg-white py-5">
      {!newContentType && (
        <>
          <p className="text-center">
            Select the main type of content. Files and links can be added as
            resources. Learn about content types.
          </p>
          <div className="mx-auto mt-5 flex items-center justify-center gap-x-5">
            <div
              onClick={() => {
                setNewContentType("video");
                setCurrentActionText("Add Video");
              }}
              className="flex flex-col border hover:cursor-pointer hover:bg-gray-200"
            >
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="mt-3 px-8 py-1"
                size="2x"
              />
              <div className="mt-5 bg-gray-200 text-center">Video</div>
            </div>
            <div
              onClick={() => {
                setNewContentType("article");
                setCurrentActionText("Add Article");
              }}
              className="flex flex-col border hover:cursor-pointer hover:bg-gray-200"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="mt-3 px-8 py-1"
                size="2x"
              />
              <div className="mt-5 bg-gray-200 text-center">Article</div>
            </div>
          </div>
        </>
      )}
      <div className="mx-5">
        {newContentType === "video" && (
          <Video
            setNewContentType={setNewContentType}
            contentId={contentId}
            setShowContentDetails={setShowContentDetails}
            setShowNewContentForm={setShowNewContentForm}
            newContentType={newContentType}
          />
        )}
        {newContentType === "article" && (
          <Article
            setNewContentType={setNewContentType}
            contentId={contentId}
            setShowContentDetails={setShowContentDetails}
            setShowNewContentForm={setShowNewContentForm}
            newContentType={newContentType}
            existingText={existingText}
            existingArticleDuration={existingArticleDuration}
          />
        )}
      </div>
    </div>
  );
}

function Video({
  setNewContentType,
  contentId,
  setShowContentDetails,
  setShowNewContentForm,
  newContentType,
}) {
  const dispatch = useDispatch();
  const { updateCourseContent } = useUpdateCourseContent();
  const { content } = useSelector((store) => store.manageCourse);

  useEffect(() => {
    dispatch(setNewContent(null));
  }, [dispatch]);

  return (
    <>
      <input
        type="file"
        placeholder="Select video"
        className="mx-auto mt-10 w-full border-2 hover:cursor-pointer"
        onChange={(e) => dispatch(setNewContent(e.target.files[0]))}
      />
      {content && (
        <div className="flex items-center gap-x-3  py-5 pr-5">
          <button
            onClick={() => setNewContentType(null)}
            className="ml-auto border border-black px-5 py-1 text-lg font-semibold hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setNewContentType(null);
              setShowNewContentForm(false);
              setShowContentDetails(true);
              updateCourseContent({
                id: contentId,
                updateCourseContentObj: {
                  content,
                  content_type: newContentType,
                },
              });
            }}
            className="border border-black bg-gray-800 px-5 py-1 text-lg font-semibold text-white hover:bg-gray-700"
          >
            Save Lecture
          </button>
        </div>
      )}
    </>
  );
}

export function Article({
  setNewContentType,
  setShowNewContentForm,
  setShowContentDetails,
  newContentType,
  contentId,
  existingText,
  existingArticleDuration,
}) {
  const [text, setText] = useState(existingText?.text || "");
  const { updateCourseContent } = useUpdateCourseContent();
  const [duration, setDuration] = useState(
    existingArticleDuration ? `${existingArticleDuration / 60} Min` : "1 min",
  );
  const [showDurationDropdown, setShowDurationTypeDropdown] = useState(false);

  return (
    <>
      <SunEditor
        key={contentId}
        setContents={text}
        onChange={(content) => {
          setText(content);
        }}
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
            ["undo", "redo"],
            ["codeView", "link"],
          ],
        }}
        autoFocus={false}
        height="150px"
      />
      <div className="flex items-end justify-between">
        <div className="mt-5 flex flex-1 flex-col gap-y-3">
          <label className="font-semibold">Duration:</label>
          <GeneralDropdownContainer
            chosen={duration}
            placeholder={duration}
            showDropdown={showDurationDropdown}
            setShowDropdown={setShowDurationTypeDropdown}
            width="w-32"
            customFn={(item) => {
              setShowDurationTypeDropdown(false);
              setDuration(item.name);
            }}
            data={Array.from({ length: 59 }, (_, i) => ({
              id: i + 1,
              name: `${i + 1} min`,
            }))}
          />
        </div>
        {!isTextEmpty(text) && (
          <div className="flex items-center gap-x-3  pr-5">
            <button
              onClick={() => setNewContentType(null)}
              className="ml-auto border border-black px-5 py-1 text-lg font-semibold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setNewContentType(null);
                setShowNewContentForm(false);
                setShowContentDetails(true);
                updateCourseContent({
                  id: contentId,
                  updateCourseContentObj: {
                    duration: +duration?.split(" ")?.at(0) * 60,
                    content_type: newContentType,
                    text: JSON.stringify({ text }),
                  },
                });
              }}
              className="border border-black bg-gray-800 px-5 py-1 text-lg font-semibold text-white hover:bg-gray-700"
            >
              Save Lecture
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default NewContent;
