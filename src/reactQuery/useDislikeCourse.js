import { dislikeCourse as dislikeCourseApi } from "../services/apiLikes";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDislikeCourse() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: dislikeCourse } = useMutation({
    mutationFn: dislikeCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  return { isLoading, dislikeCourse };
}
