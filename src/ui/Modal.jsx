import ModalXCloser from "./ModalXCloser";
import Overlay from "./Overlay";

function Modal({ setClickedModal, children }) {
  return (
    <>
      <div className="fixed inset-0 z-[500000] h-full w-full bg-white shadow-2xl lg:left-1/2 lg:top-1/2 lg:h-fit lg:w-[38rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg">
        <ModalXCloser setClickedModal={setClickedModal} />
        {children}
      </div>
      <Overlay />
    </>
  );
}

export default Modal;
