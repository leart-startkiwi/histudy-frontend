import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse as deleteCourseApi } from "../services/apiCourses";
import toast from "react-hot-toast";

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteCourse } = useMutation({
    mutationFn: deleteCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      toast.success("Course deleted successfully.");
    },
  });

  return { isLoading, deleteCourse };
}
