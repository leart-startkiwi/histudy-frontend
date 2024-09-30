import { useQuery } from "@tanstack/react-query";
import { getPrices } from "../../services/apiConstants";

export function usePrices() {
  const { isLoading, data: prices } = useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
  });

  return { isLoading, prices };
}
