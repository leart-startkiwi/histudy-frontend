import { useModalCloser } from "../../hooks/useModalCloser";
import GradientButton from "../../ui/GradientButton";
import AddEditCategoryModal from "./AddEditCategoryModal";
import Overlay from "../../ui/Overlay";
import { useCreateCategory } from "../../reactQuery/useCreateCategory";

function AddCategory() {
  const [clickedModal, setClickedModal] = useModalCloser();
  const { createCategory } = useCreateCategory();

  function openModal() {
    setClickedModal(true);
  }

  return (
    <>
      <div className="sticky bottom-5">
        <GradientButton
          text="Add new Category"
          xPosition="mx-auto"
          yPosition="mt-6"
          customFn={openModal}
        />
      </div>
      {clickedModal && (
        <>
          <AddEditCategoryModal
            setClickedModal={setClickedModal}
            method="Create"
            submitFunction={createCategory}
          />
          <Overlay />
        </>
      )}
    </>
  );
}

export default AddCategory;
