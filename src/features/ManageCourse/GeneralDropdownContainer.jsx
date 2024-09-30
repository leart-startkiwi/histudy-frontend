import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GeneralDropdown from "./GeneralDropdown";
import { useEffect, useRef } from "react";

function GeneralDropdownContainer({
  chosen,
  placeholder,
  showDropdown,
  setShowDropdown,
  width,
  customFn,
  data,
}) {
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setShowDropdown]);

  return (
    <div ref={dropdownRef} className={`relative flex ${width} flex-col border`}>
      <div
        role="button"
        onClick={() => setShowDropdown(!showDropdown)}
        className="unselectable flex items-center justify-between  text-nowrap  bg-white px-5 py-3 text-stone-500 hover:cursor-pointer"
      >
        <p className="capitalize">{placeholder}</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {showDropdown && (
        <GeneralDropdown chosen={chosen} data={data} customFn={customFn} />
      )}
    </div>
  );
}

export default GeneralDropdownContainer;
