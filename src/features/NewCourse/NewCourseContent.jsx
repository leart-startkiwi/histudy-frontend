import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewCourseDescription,
  setNewCourseImage,
  setNewCourseName,
} from "../../redux/newCourseSlice";
import { inputStyle, labelStyle } from "../../utils/helpers";
import NewCourseCategoryDropdown from "./NewCourseCategoryDropdown";
import NewCourseMainBody from "./NewCourseMainBody";
import SunEditor from "suneditor-react";

function NewCourseContent() {
  const { currentPage, name, description, category } = useSelector(
    (store) => store.newCourse,
  );
  const dispatch = useDispatch();

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setNewCourseImage(file));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {currentPage === 1 ? (
        <NewCourseMainBody
          key={1}
          header="How about a working title?"
          description="It's ok if you can't think of a good title now. You can change it later."
        >
          <>
            <div className="relative mx-auto mt-10 w-3/4">
              <input
                id="courseTitle"
                type="text"
                className={inputStyle}
                placeholder=" "
                onChange={(e) => dispatch(setNewCourseName(e.target.value))}
                defaultValue={name}
              />
              <label htmlFor="courseTitle" className={labelStyle}>
                e.g. Learn Photoshop CS6 from Scratch
              </label>
            </div>
          </>
        </NewCourseMainBody>
      ) : currentPage === 2 ? (
        <NewCourseMainBody
          key={2}
          header="Describe your course content"
          description="Provide a brief overview of what your course will cover."
        >
          <div className="mt-10 text-left">
            <SunEditor
              placeholder="e.g. Master the basics of Photoshop, from tools to advanced
                editing techniques"
              setContents={description?.description}
              onChange={(content) => {
                dispatch(setNewCourseDescription({ description: content }));
              }}
              setOptions={{
                buttonList: [["bold", "italic"], ["list"]],
              }}
              autoFocus={false}
              height="150px"
            />
          </div>
        </NewCourseMainBody>
      ) : currentPage === 3 ? (
        <NewCourseMainBody
          header="What category best fits the knowledge you'll share?"
          description="If you're not sure about the right category, you can change it later."
        >
          <div className="relative mx-auto mt-10 flex w-3/4 flex-col border">
            <div
              role="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="unselectable flex items-center justify-between gap-x-20 rounded-md bg-white px-5 py-3 text-stone-500 hover:cursor-pointer"
            >
              <p>{category ? category.name : "Choose a category"}</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
            {showCategoryDropdown && (
              <NewCourseCategoryDropdown
                setShowCategoriesDropdown={setShowCategoryDropdown}
              />
            )}
          </div>
        </NewCourseMainBody>
      ) : (
        <NewCourseMainBody
          header="Add an Image to Represent Your Course"
          description="A great course starts with an eye-catching image. Upload a high-quality thumbnail that represents your course and grabs students' attention."
        >
          <div className="mx-auto mt-10 w-1/2">
            <div className="flex flex-col gap-y-3">
              <img
                src={imagePreview ? imagePreview : `/placeholderImg.jpg`}
                className="border-2 border-dashed hover:cursor-pointer hover:border-black"
                alt="Course thumbnail preview"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </NewCourseMainBody>
      )}
    </>
  );
}

export default NewCourseContent;
