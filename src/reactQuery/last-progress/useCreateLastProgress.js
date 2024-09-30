import { useMutation } from "@tanstack/react-query";
import { createLastProgress as createLastProgressApi } from "../../services/apiLastProgress";

export function useCreateLastProgress() {
  const { isLoading, mutate: createLastProgress } = useMutation({
    mutationFn: createLastProgressApi,
  });

  return { isLoading, createLastProgress };
}
