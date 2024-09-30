import { useEffect, useRef, useState } from "react";

export function useDropdownCloser() {
  const elementRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (elementRef.current && !elementRef.current.contains(e.target)) {
          setShowDropdown(false);
        }
      }

      if (showDropdown) {
        document.addEventListener("click", handleClickOutside);
      }

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [showDropdown],
  );

  return {
    elementRef,
    showDropdown,
    setShowDropdown,
  };
}
