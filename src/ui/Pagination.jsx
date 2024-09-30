import { useSearchParams } from "react-router-dom";
import PaginationElement from "./PaginationElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = searchParams?.get("pageNumber");

  if (currentPage === null || currentPage <= 0) {
    currentPage = 1;
  }

  if (currentPage >= totalPages) {
    currentPage = totalPages;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  function previousPage() {
    if (+currentPage >= 2) {
      searchParams.set("pageNumber", +currentPage - 1);
      setSearchParams(searchParams);
    }
  }

  function specificPage(pageNum) {
    searchParams.set("pageNumber", pageNum + 1);
    setSearchParams(searchParams);
  }

  function nextPage() {
    if (+currentPage < totalPages) {
      searchParams.set("pageNumber", +currentPage + 1);
      setSearchParams(searchParams);
    }
  }

  function showPreviousButton() {
    return +currentPage >= 2;
  }

  function showNextButton() {
    return +currentPage < totalPages;
  }

  useEffect(
    function () {
      if (
        currentPage === null ||
        +searchParams?.get("pageNumber") === 0 ||
        searchParams?.get("pageNumber")?.startsWith("-")
      ) {
        searchParams.set("pageNumber", 1);
        setSearchParams(searchParams);
      }
    },
    [currentPage, searchParams, setSearchParams],
  );

  useEffect(
    function () {
      if (currentPage >= totalPages) {
        searchParams.set("pageNumber", totalPages);
        setSearchParams(searchParams);
      }
    },
    [totalPages, currentPage, searchParams, setSearchParams],
  );

  return (
    <>
      {totalPages > 1 && (
        <div className="mx-auto flex items-center justify-center gap-x-3">
          <PaginationElement
            customFn={() => previousPage()}
            show={showPreviousButton()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </PaginationElement>
          {pages?.map((element, i) => (
            <PaginationElement
              key={i}
              customFn={() => specificPage(i)}
              currentPage={currentPage}
            >
              {i + 1}
            </PaginationElement>
          ))}
          <PaginationElement
            customFn={() => nextPage()}
            show={showNextButton()}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </PaginationElement>
        </div>
      )}
    </>
  );
}

export default Pagination;
