import { useEffect, useRef, useState } from "react";
import { useStatuses } from "../../reactQuery/useStatuses";
import GradientButton from "../../ui/GradientButton";
import StatusPill from "../../ui/StatusPill";
import CloseSearchModal from "./CloseSearchModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeAllStatuses } from "../../redux/activeStatusesSlice";
import { setSearch } from "../../redux/searchSlice";
import { useSearchParams } from "react-router-dom";

function SearchingModal({ setClickedModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [searchParams] = useSearchParams();

  const { statuses } = useStatuses();
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("name") || "",
  );

  const { search } = useSelector((store) => store.search);

  const { activeStatuses } = useSelector((store) => store.activeStatuses);
  const statusesFilter = activeStatuses?.join("&");

  function submit() {
    navigate(`/courses?name=${searchQuery}&statuses=${statusesFilter}`);
    dispatch(setSearch(searchQuery));
    setClickedModal(false);
    dispatch(removeAllStatuses());
  }

  function handleSubmit() {
    if (activeStatuses?.length > 0 || searchQuery.length > 0) submit();
  }

  useEffect(
    function () {
      function handleEnter(e) {
        if (e.key === "Enter") {
          submit();
        }
      }

      if (
        (activeStatuses?.length > 0 || searchQuery.length > 0) &&
        document.activeElement === inputRef.current
      ) {
        document.addEventListener("keydown", handleEnter);
      }

      return () => {
        document.removeEventListener("keydown", handleEnter);
      };
    },
    [activeStatuses?.length, searchQuery?.length],
  );

  return (
    <>
      <div className="animateOpenModal fixed inset-0 z-[500000] h-full w-full bg-white  shadow-2xl lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:overflow-y-auto lg:rounded-lg ">
        <CloseSearchModal setClickedModal={setClickedModal} />
        <div className="mt-24 flex flex-col gap-y-10">
          <div className="flex items-center justify-center gap-x-5">
            {statuses?.data?.statuses?.map((status) => (
              <StatusPill key={status} status={status} />
            ))}
          </div>
          <input
            ref={inputRef}
            onChange={(e) => setSearchQuery(e.target.value)}
            defaultValue={search || searchQuery}
            className=" mx-auto block w-[93%] rounded-md border-2 px-5 py-3 text-lg font-medium text-gray-400 outline-blue-600"
            placeholder="What are you looking for?"
          />
          <GradientButton
            text="Search"
            xPosition="mx-auto"
            customFn={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default SearchingModal;
