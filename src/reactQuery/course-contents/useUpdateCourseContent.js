import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourseContent as updateCourseContentApi } from "../../services/apiCourseContents";

export function useUpdateCourseContent() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateCourseContent } = useMutation({
    mutationFn: (updateCourseContentObj) =>
      updateCourseContentApi(
        updateCourseContentObj.id,
        updateCourseContentObj.updateCourseContentObj,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
    },
  });

  return { isLoading, updateCourseContent };
}
