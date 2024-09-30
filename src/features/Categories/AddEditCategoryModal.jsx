import ModalXCloser from "../../ui/ModalXCloser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormImage from "../../ui/FormImage";
import { useCategorySubmition } from "../../hooks/useCategorySubmition";
import CategoryNameInput from "../../ui/CategoryNameInput";
import AddEditModelFooter from "../../ui/AddEditModelFooter";

function AddCategoryModal({
  setClickedModal,
  method,
  submitFunction,
  category,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [requestError, setRequestError] = useState("");

  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    trigger,
  } = useForm({
    defaultValues: {
      name: category?.name,
      image: category?.icon,
    },
  });

  const image = watch("icon") || category?.icon;
  console.log(image);

  const { onSubmit } = useCategorySubmition({
    selectedFile,
    setError,
    clearErrors,
    submitFunction,
    setClickedModal,
    image,
    categoryId: category?.id,
    setRequestError,
    trigger,
  });

  function submit() {
    if (!image) {
      setImageError("Please choose a cover image");
    }
  }

  useEffect(
    function () {
      if (image) {
        setImageError("");
      }
    },
    [image],
  );

  return (
    <div className="fixed inset-0 z-[500000] h-full w-full bg-white shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-fit lg:w-[38rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg">
      <ModalXCloser setClickedModal={setClickedModal} />
      <h2 className="p-5 text-2xl font-medium">{method} Category</h2>
      <hr></hr>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mt-3 flex flex-col gap-y-4 px-5">
          <FormImage
            property="icon"
            image={image}
            setValue={setValue}
            error={imageError}
            setSelectedFile={setSelectedFile}
          />

          <CategoryNameInput
            error={errors.name?.message}
            register={register}
            requestError={requestError}
            setRequestError={setRequestError}
          />
          <p className="text-sm text-red-600">{requestError}</p>
        </div>

        <AddEditModelFooter
          setClickedModal={setClickedModal}
          btnText={method}
          submit={submit}
        />
      </form>
    </div>
  );
}

export default AddCategoryModal;
