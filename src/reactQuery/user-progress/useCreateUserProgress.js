import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserProgress as createUserProgressApi } from "../../services/apiUserProgress";

export function useCreateUserProgress() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createUserProgress } = useMutation({
    mutationFn: createUserProgressApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProgress"]);
    },
  });

  return { isLoading, createUserProgress };
}
