import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncementComment as createAnnouncementCommentApi } from "../../services/apiAnnouncements";

export function useCreateAnnouncementComment() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: createAnnouncementComment } = useMutation({
    mutationFn: createAnnouncementCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });

  return { isLoading, createAnnouncementComment };
}
