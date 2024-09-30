import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseSection as createCourseSectionApi } from "../../services/apiCourseSections";

export function useCreateCourseSection() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: createCourseSection } = useMutation({
    mutationFn: createCourseSectionApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
    },
  });

  return { isLoading, createCourseSection };
}
