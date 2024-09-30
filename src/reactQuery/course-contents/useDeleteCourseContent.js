import { deleteCourseContent as deleteCourseContentApi } from "../../services/apiCourseContents";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteCourseContent() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteCourseContent } = useMutation({
    mutationFn: deleteCourseContentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
    },
  });

  return { isLoading, deleteCourseContent };
}
