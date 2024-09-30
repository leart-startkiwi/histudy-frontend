import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview as createReviewApi } from "../../services/apiReviews";

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createReview } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ownReview"],
      });
    },
  });

  return { isLoading, createReview };
}
