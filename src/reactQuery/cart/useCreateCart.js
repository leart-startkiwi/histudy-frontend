import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart as addToCartApi } from "../../services/apiCart";

export function useCreateCart() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: addToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", "likes"]);
    },
  });

  return { isLoading, addToCart };
}
