import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncementComment as deleteAnnouncementCommentApi } from "../../services/apiAnnouncements";

export function useDeleteAnnouncementComment(announcementId) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteAnnouncementComment } = useMutation({
    mutationFn: deleteAnnouncementCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcementComments", announcementId],
      });
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
  });

  return { isLoading, deleteAnnouncementComment };
}
