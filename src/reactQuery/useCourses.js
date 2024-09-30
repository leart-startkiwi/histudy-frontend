import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourses } from "../services/apiCourses";

export function useCourses(queryParams) {
  const queryClient = useQueryClient();

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses", queryParams],
    queryFn: () => getCourses(queryParams),
  });

  return { isLoading, courses };
}

// if (+queryParams.pageNumber < courses?.totalPages) {
//   queryClient.prefetchQuery({
//     queryKey: [
//       "courses",
//       { ...queryParams, pageNumber: +queryParams.pageNumber + 1 },
//     ],
//     queryFn: () =>
//       getCourses({ ...queryParams, pageNumber: +queryParams.pageNumber + 1 }),
//   });
// }

// if (+queryParams.pageNumber > 1) {
//   queryClient.prefetchQuery({
//     queryKey: [
//       "courses",
//       { ...queryParams, pageNumber: +queryParams.pageNumber - 1 },
//     ],
//     queryFn: () =>
//       getCourses({ ...queryParams, pageNumber: +queryParams.pageNumber - 1 }),
//   });
// }
