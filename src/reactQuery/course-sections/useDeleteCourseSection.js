import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseSection as deleteCourseSectionApi } from "../../services/apiCourseSections";

export function useDeleteCourseSection() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteCourseSection } = useMutation({
    mutationFn: deleteCourseSectionApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
    },
  });

  return { isLoading, deleteCourseSection };
}
