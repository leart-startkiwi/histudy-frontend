import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLanguages } from "../../../reactQuery/constants/useLanguages";
import { useCourse } from "../../../reactQuery/courses/useCourse";
import GeneralDropdownContainer from "../GeneralDropdownContainer";
import CourseLandingInput from "./CourseLandingInput";
import DescriptionEditor from "./DescriptionEditor";
import { useCategories } from "../../../reactQuery/useCategories";
import { useStatuses } from "../../../reactQuery/useStatuses";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseCategory,
  setCourseLanguage,
  setCourseName,
  setCourseSkillLevel,
  setNewImage,
} from "../../../redux/manageCourseSlice";

function CourseLandingPage() {
  const dispatch = useDispatch();
  const { language, category, skillLevel, name, photo } = useSelector(
    (store) => store.manageCourse,
  );
  const params = useParams();
  const { course } = useCourse(params.id);
  const { languages } = useLanguages();
  const { categories } = useCategories();
  const { statuses } = useStatuses();

  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setNewImage(file));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (course?.data?.image) {
      setImagePreview(course?.data?.image);
    }
  }, [course?.data?.image]);

  return (
    <>
      <p>
        Your course landing page is crucial to your success on Histudy. If it’s
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course. Learn more about creating your course landing page and
        course title standards.
      </p>
      <div className="flex flex-col gap-y-3">
        <label className="font-bold">Course title</label>
        <CourseLandingInput
          id="title"
          label="Insert your course title."
          value={name || course?.data?.name}
          customFn={setCourseName}
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <label className="font-bold">Course description</label>
        <DescriptionEditor />
      </div>
      <div className="flex flex-col gap-y-3">
        <label className="font-bold">Basic info</label>
        <div className="flex items-start gap-x-5">
          <GeneralDropdownContainer
            chosen={language || course?.data?.language}
            placeholder={
              language || course?.data?.language || "Select Language"
            }
            showDropdown={showLanguagesDropdown}
            setShowDropdown={setShowLanguagesDropdown}
            width="w-1/3"
            customFn={(item) => {
              setShowLanguagesDropdown(false);
              dispatch(setCourseLanguage(item.name));
            }}
            data={languages?.data}
          />
          <GeneralDropdownContainer
            chosen={skillLevel || course?.data?.skillLevel}
            placeholder={
              skillLevel || course?.data?.skillLevel || "Select Level"
            }
            showDropdown={showLevelDropdown}
            setShowDropdown={setShowLevelDropdown}
            width="w-1/3"
            customFn={(item) => {
              setShowLevelDropdown(false);
              dispatch(setCourseSkillLevel(item.name));
            }}
            data={statuses?.data}
          />
          <GeneralDropdownContainer
            chosen={category?.name || course?.data?.category.name}
            placeholder={
              category?.name || course?.data?.category.name || "Select Category"
            }
            showDropdown={showCategoryDropdown}
            setShowDropdown={setShowCategoryDropdown}
            width="w-1/3"
            customFn={(item) => {
              setShowCategoryDropdown(false);
              dispatch(setCourseCategory(item));
            }}
            data={categories?.data}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-3">
          <label className="font-bold">Course Image</label>
          <img
            src={imagePreview ? imagePreview : `/placeholderImg.jpg`}
            className="border-2"
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="mt-7">
            Upload your course image here. It must meet our course image quality
            standards to be accepted. Important guidelines: 750x422 pixels;
            .jpg, .jpeg, .gif, or .png. no text on the image.
          </p>
          <input
            type="file"
            className="border-2 hover:cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </>
  );
}

export default CourseLandingPage;
