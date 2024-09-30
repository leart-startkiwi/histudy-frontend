import ModalXCloser from "./ModalXCloser";
import ModalCancelCloser from "./ModalCancelCloser";

function ConfirmDeleteModal({
  setClickedModal,
  item,
  title,
  deleteFunction,
  children,
}) {
  return (
    <div className="fixed inset-0 z-[500000] h-full w-full bg-white shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-[40%] lg:w-[38rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg">
      <ModalXCloser setClickedModal={setClickedModal} />
      <h2 className="p-5 text-2xl font-medium">Delete {title}</h2>
      <hr></hr>

      <div className="mt-3 flex h-[45%] flex-col gap-y-3 p-5 text-center text-xl">
        <p>
          Are you sure you want to delete <strong>{item.name}</strong>{" "}
          permanently?
        </p>
        {children}
      </div>

      <div className="py-5">
        <hr></hr>
        <div className="mt-4 flex items-center justify-end gap-x-4 px-5">
          <ModalCancelCloser setClickedModal={setClickedModal} />
          <button
            onClick={() => {
              deleteFunction(item.id);
              setClickedModal(false);
            }}
            type="submit"
            className="h-11 rounded-md bg-red-600 px-8  py-2 font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
