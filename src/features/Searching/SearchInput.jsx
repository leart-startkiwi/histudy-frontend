import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("name") || "",
  );

  const inputRef = useRef();

  useEffect(
    function () {
      function handleSubmit(e) {
        if (e.key === "Enter" && document.activeElement === inputRef.current) {
          navigate(`/courses?name=${searchQuery}`);
          inputRef.current.blur();
        }
      }

      if (searchQuery.length > 0) {
        document.addEventListener("keydown", handleSubmit);
      }

      return () => {
        document.removeEventListener("keydown", handleSubmit);
      };
    },
    [navigate, searchQuery],
  );

  return (
    <div className="relative mx-12 hidden flex-1 lg:block">
      <input
        ref={inputRef}
        onChange={(e) => setSearchQuery(e.target.value)}
        defaultValue={searchQuery}
        className="w-full rounded-full border-2 px-12 py-2 text-stone-600 outline-blue-600 "
        placeholder="Search for anything"
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="absolute inset-0 left-5 top-4 text-stone-600"
      />
    </div>
  );
}

export default SearchInput;
