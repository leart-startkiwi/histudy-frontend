import { useQuery } from "@tanstack/react-query";
import { getAnnouncementComments } from "../../services/apiAnnouncements";

export function useAnnouncementComments(announcementId) {
  const { isLoading, data: announcementComments } = useQuery({
    queryFn: () => getAnnouncementComments(announcementId),
    queryKey: ["announcementComments", announcementId],
  });

  return { isLoading, announcementComments };
}
