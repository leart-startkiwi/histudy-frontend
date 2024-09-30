import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../../services/apiReviews";

export function useGetMyReviews() {
  const { isLoading, data: myReviews } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
  });

  return { isLoading, myReviews };
}
