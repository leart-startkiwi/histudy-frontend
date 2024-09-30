import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createCourseContent as createCourseContentApi } from "../../services/apiCourseContents";

export function useCreateCourseContent() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: createCourseContent } = useMutation({
    mutationFn: createCourseContentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
    },
  });

  return { isLoading, createCourseContent };
}
