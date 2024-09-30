import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse as updateCourseApi } from "../services/apiCourses";
import toast from "react-hot-toast";

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateCourse } = useMutation({
    mutationFn: (updateCourseObj) =>
      updateCourseApi(updateCourseObj.id, updateCourseObj.updateCourseObj),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
      toast.success("Course updated successfully.");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { isLoading, updateCourse };
}
