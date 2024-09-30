import { useForm } from "react-hook-form";
import ModalXCloser from "../../../ui/ModalXCloser";
import { useEffect, useState } from "react";
import FormImage from "../../../ui/FormImage";
import AddEditModelFooter from "../../../ui/AddEditModelFooter";
import { useCourseSubmition } from "../../../hooks/useCourseSubmition";
import CourseInput from "../../../ui/CourseInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useCategories } from "../../../reactQuery/useCategories";
import { useSkillLevels } from "../../../reactQuery/useSkillLevels";
import CourseModalPill from "../../../ui/CourseModalPill";
import { useStatuses } from "../../../reactQuery/useStatuses";

function AddEditCourseModal({
  setClickedModal,
  method,
  submitFunction,
  course,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSkillLevelDropdown, setShowSkillLevelDropdown] = useState(false);

  const [category, setCategory] = useState(
    course?.category || "Select a Category",
  );
  const [categoryError, setCategoryError] = useState("");
  const [skillLevel, setSkillLevel] = useState(
    course?.skillLevel || "Select Skill Level",
  );
  const [skillLevelError, setSkillLevelError] = useState("");

  const { categories } = useCategories();
  const { skillLevels } = useSkillLevels();
  const { statuses } = useStatuses();

  const existingCertificate = course?.certificate === true ? "Yes" : "No";

  const [certificate, setCertificate] = useState(existingCertificate || "");
  const [certificateError, setCertificateError] = useState("");
  const [statusState, setStatus] = useState(course?.status || "");
  const [statusError, setStatusError] = useState("");

  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      name: course?.name,
      image: course?.cover,
      description: course?.description,
      teacher: "Ridvan Aliu",
      video_Link: course?.video_Link,
      status: course?.status,
      categoryId: course?.categoryId,
      language: course?.language,
      skillLevel: course?.skillLevel,
      price: course?.price,
      certificate: course?.certificate,
    },
  });

  const image = watch("cover") || course?.cover;

  const { onSubmit } = useCourseSubmition({
    selectedFile,
    setCategoryError,
    submitFunction,
    setClickedModal,
    certificate,
    statusState,
    image,
    courseId: course?.id,
  });

  function submit() {
    if (getValues("categoryId") === undefined) {
      setCategoryError("Please choose a category");
    }

    if (getValues("skillLevel") === undefined) {
      setSkillLevelError("Please choose a skill level");
    }

    if (certificate === "") {
      setCertificateError("Please choose an option");
    }

    if (statusState === "") {
      setStatusError("Please choose a status");
    }

    if (!image) {
      setImageError("Please choose a cover image");
    }

    if (
      (statusState === "Paid" || statusState === "Subscription") &&
      (getValues("price") === "" || getValues("price") === 0)
    ) {
      setPriceError("Please set a price");
    }
  }

  useEffect(
    function () {
      if (statusState !== "") {
        setStatusError("");
      }
    },
    [statusState],
  );

  useEffect(
    function () {
      if (certificate !== "") {
        setCertificateError("");
      }
    },
    [certificate],
  );

  useEffect(
    function () {
      if (image) {
        setImageError("");
      }
    },
    [image],
  );

  return (
    <div className="fixed inset-0 z-[500000] h-full w-full bg-white shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-[95%] lg:w-2/3 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-scroll lg:rounded-lg">
      <ModalXCloser setClickedModal={setClickedModal} />
      <h2 className="p-5 text-2xl font-medium">{method} Course</h2>
      <hr></hr>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mt-3 flex flex-col px-5">
          <FormImage
            property="cover"
            image={image}
            setValue={setValue}
            error={imageError}
            setSelectedFile={setSelectedFile}
            width="w-80 h-56"
          />

          <CourseInput
            error={errors.name?.message}
            register={register}
            property="name"
            label="Course Name"
          />
          <CourseInput
            error={errors.description?.message}
            register={register}
            property="description"
            label="Description"
          />
          <div className="relative mt-5">
            <div
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className={`${categoryError && "border-red-600"} unselectable flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-2.5 py-3.5 text-sm text-gray-500 hover:cursor-pointer`}
            >
              {category}
              {!showCategoryDropdown ? (
                <FontAwesomeIcon icon={faChevronDown} className="ms-auto" />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} className="ms-auto" />
              )}
            </div>
            <p className="text-sm text-red-600">{categoryError}</p>
          </div>
          {showCategoryDropdown && (
            <div className="border-gray-300 bg-gray-50 p-3 shadow-md hover:cursor-default">
              {categories?.data?.map((cat) => (
                <div
                  onClick={() => {
                    setCategory(cat.name);
                    setCategoryError("");
                    setValue("categoryId", cat.id);
                    setShowCategoryDropdown(false);
                  }}
                  key={cat.id}
                  className={`${category === cat.name ? "bg-gray-300 text-blue-600" : "bg-gray-50 text-gray-500"} unselectable w-full rounded-md border-gray-300 px-5 py-2 text-sm hover:cursor-pointer hover:bg-gray-200 hover:text-blue-600`}
                >
                  {cat.name}
                </div>
              ))}
            </div>
          )}
          <CourseInput
            error={errors.teacher?.message}
            register={register}
            property="teacher"
            label="Instructor"
          />
          <CourseInput
            error={errors.video_Link?.message}
            register={register}
            property="video_Link"
            label="Course Link"
          />

          <div className="relative mt-5">
            <div
              onClick={() => setShowSkillLevelDropdown(!showSkillLevelDropdown)}
              className={`${skillLevelError && "border-red-600"} unselectable flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-50 px-2.5 py-3.5 text-sm text-gray-500 hover:cursor-pointer`}
            >
              {skillLevel}
              {!showSkillLevelDropdown ? (
                <FontAwesomeIcon icon={faChevronDown} className="ms-auto" />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} className="ms-auto" />
              )}
            </div>
            <p className="text-sm text-red-600">{skillLevelError}</p>
            {showSkillLevelDropdown && (
              <div className="border-gray-300 bg-gray-50 p-3 shadow-md hover:cursor-default">
                {skillLevels?.map((skill) => (
                  <div
                    onClick={() => {
                      setSkillLevel(skill);
                      setSkillLevelError("");
                      setValue("skillLevel", skill);
                      setShowSkillLevelDropdown(false);
                    }}
                    key={skillLevel}
                    className={`${skillLevel === skill ? "bg-gray-300 text-blue-600" : "bg-gray-50 text-gray-500"} unselectable w-full rounded-md px-5 py-2 text-sm  hover:cursor-pointer hover:bg-gray-200 hover:text-blue-600`}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            )}
          </div>
          <CourseInput
            error={errors.language?.message}
            register={register}
            property="language"
            label="Language"
          />
          <div className="flex items-center justify-between">
            <div className="relative mt-5 flex flex-col gap-y-2 ps-1">
              <p className="text-sm text-gray-500">Certificate</p>
              <div
                className={`${certificateError ? "border border-red-600" : "border-0"} flex w-fit items-center gap-x-1 rounded-full border-gray-300  bg-gray-50 p-[0.35rem] shadow-md`}
              >
                <CourseModalPill
                  text="Yes"
                  activePill={certificate}
                  setActivePill={setCertificate}
                />
                <CourseModalPill
                  text="No"
                  activePill={certificate}
                  setActivePill={setCertificate}
                />
              </div>
              <p className="text-sm text-red-600">{certificateError}</p>
            </div>
            <div className="relative mt-5 flex flex-col gap-y-2 ps-1">
              <p className="text-sm text-gray-500">Status</p>
              <div
                className={`${statusError ? "border border-red-600" : "border-0"} flex w-fit items-center gap-x-1 rounded-full border-gray-300 bg-gray-50 p-[0.35rem] shadow-md`}
              >
                {statuses?.data?.statuses
                  ?.filter((s) => s !== "Locked")
                  ?.map((status) => (
                    <CourseModalPill
                      key={status}
                      text={status}
                      activePill={statusState}
                      setActivePill={setStatus}
                    />
                  ))}
              </div>
              <p className="text-sm text-red-600">{statusError}</p>
            </div>
          </div>
          {(statusState === "Paid" || statusState === "Subscription") && (
            <>
              <div className="ms-auto flex w-[18%] items-center gap-x-2">
                <CourseInput
                  type="number"
                  error={priceError}
                  register={register}
                  property="price"
                  label="Price"
                  required={false}
                />
                <p className="text-nowrap pt-4 text-sm">
                  €{" "}
                  {statusState === "Subscription" && <span> / per month</span>}
                </p>
              </div>
            </>
          )}
        </div>
        <AddEditModelFooter
          submit={submit}
          setClickedModal={setClickedModal}
          btnText={method}
        />
      </form>
    </div>
  );
}

export default AddEditCourseModal;
