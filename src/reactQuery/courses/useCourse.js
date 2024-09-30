import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../services/apiCourses";

export function useCourse(courseId) {
  const { isLoading, data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourse(courseId),
  });

  return { isLoading, course };
}
