function ModalCancelCloser({ setClickedModal }) {
  return (
    <button
      type="button"
      onClick={() => setClickedModal(false)}
      className="h-11 cursor-pointer rounded-[4px] bg-stone-100 px-8 text-center text-sm font-semibold text-blue-600 transition-all hover:bg-stone-200"
    >
      Cancel
    </button>
  );
}

export default ModalCancelCloser;
