import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoResultsFound() {
  return (
    <div className="mx-auto -mt-10 flex flex-col items-center justify-center gap-y-5 px-3 pb-10 md:w-[90%]">
      <img src="../../public/noResultsFound.png" className="w-80" />
      <p className="mx-auto -mt-10 text-center text-3xl font-semibold">
        No results found! Please try refining your search or exploring our
        categories.
      </p>
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="h-14 w-14 rounded-full bg-stone-100 text-2xl font-bold text-blue-600 hover:bg-stone-200 "
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
}

export default NoResultsFound;
