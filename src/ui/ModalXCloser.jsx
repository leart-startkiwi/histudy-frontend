import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ModalXCloser({ setClickedModal }) {
  return (
    <div
      role="button"
      onClick={() => setClickedModal(false)}
      className="absolute inset-0 left-[92%] top-5 flex h-[39px] w-[39px] items-center justify-center rounded-full  text-center hover:cursor-pointer hover:bg-stone-100"
    >
      <FontAwesomeIcon icon={faXmark} />
    </div>
  );
}

export default ModalXCloser;
