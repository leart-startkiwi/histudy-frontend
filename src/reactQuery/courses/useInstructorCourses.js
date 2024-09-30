import { useQuery } from "@tanstack/react-query";
import { getInstructorCourses } from "../../services/apiCourses";

export function useInstructorCourses() {
  const { isLoading, data: instructorCourses } = useQuery({
    queryKey: ["instructorCourses"],
    queryFn: getInstructorCourses,
  });

  return { isLoading, instructorCourses };
}
