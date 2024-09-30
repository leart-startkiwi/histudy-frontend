import { useQuery } from "@tanstack/react-query";
import { getOwnReview } from "../../services/apiReviews";

export function useGetOwnReview(courseId) {
  const { isLoading, data: ownReview } = useQuery({
    queryFn: () => getOwnReview(courseId),
    queryKey: ["ownReview"],
  });

  return { isLoading, ownReview };
}
