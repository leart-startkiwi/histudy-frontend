import { useQuery } from "@tanstack/react-query";
import { getPopularCourses } from "../services/apiCourses";

export function usePopularCourses() {
  const { isLoading, data: popularCourses } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: getPopularCourses,
  });

  return { isLoading, popularCourses };
}
