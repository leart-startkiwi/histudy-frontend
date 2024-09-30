import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncementComment as updateAnnouncementCommentApi } from "../../services/apiAnnouncements";

export function useUpdateAnnouncementComment(announcementId) {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateAnnouncementComment } = useMutation({
    mutationFn: (updateCommentObj) =>
      updateAnnouncementCommentApi(
        updateCommentObj.id,
        updateCommentObj.updateCommentObj,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcementComments", announcementId],
      });
    },
  });

  return { isLoading, updateAnnouncementComment };
}
