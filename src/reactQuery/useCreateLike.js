import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeCourse as likeCourseApi } from "../services/apiLikes";

export function useCreateLike() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: likeCourse } = useMutation({
    mutationFn: likeCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });
  return { isLoading, likeCourse };
}
