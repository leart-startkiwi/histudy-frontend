import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserProgress as deleteUserProgressApi } from "../../services/apiUserProgress";

export function useDeleteProgress() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteUserProgress } = useMutation({
    mutationFn: deleteUserProgressApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProgress"]);
    },
  });

  return { isLoading, deleteUserProgress };
}
