import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../services/apiCart";
import { useUser } from "../useUser";

export function useCart() {
  const { user } = useUser();

  const { isLoading, data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!user,
  });

  return { isLoading, cart };
}
