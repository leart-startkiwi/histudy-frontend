import { useMutation } from "@tanstack/react-query";
import { markMessageAsRead as markMessageAsReadApi } from "../../services/apiChat";

export function useMarkMessageAsRead() {
  const { isLoading, mutate: markMessageAsRead } = useMutation({
    mutationFn: markMessageAsReadApi,
  });

  return { isLoading, markMessageAsRead };
}
