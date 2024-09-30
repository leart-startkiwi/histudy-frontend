import { useSearchParams } from "react-router-dom";

function NumberOfPaginatedResults({ totalResults, pageSize }) {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams?.get("pageNumber");

  const firstNumber = currentPage * pageSize - (pageSize - 1);
  const secondNumber =
    firstNumber + pageSize - 1 > totalResults
      ? firstNumber
      : firstNumber + pageSize - 1;

  return (
    <>
      {totalResults > 0 && (
        <p>
          Showing {firstNumber}-{secondNumber} of {totalResults} results
        </p>
      )}
    </>
  );
}

export default NumberOfPaginatedResults;
