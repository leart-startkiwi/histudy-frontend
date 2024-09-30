import { useQuery } from "@tanstack/react-query";
import { getLastProgress } from "../../services/apiLastProgress";

export function useLastProgress() {
  const { isLoading, data: lastProgress } = useQuery({
    queryKey: ["lastProgress"],
    queryFn: getLastProgress,
  });

  return { isLoading, lastProgress };
}
