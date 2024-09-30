import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourseSection as updateCourseSectionApi } from "../../services/apiCourseSections";

export function useUpdateCourseSection() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateCourseSection } = useMutation({
    mutationFn: (updateCourseSectionObj) =>
      updateCourseSectionApi(
        updateCourseSectionObj.id,
        updateCourseSectionObj.updateCourseSectionObj,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["course"]);
    },
  });

  return { isLoading, updateCourseSection };
}
