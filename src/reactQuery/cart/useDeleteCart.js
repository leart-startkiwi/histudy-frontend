import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart as removeFromCartApi } from "../../services/apiCart";

export function useDeleteCart() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: removeFromCart } = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return { isLoading, removeFromCart };
}
