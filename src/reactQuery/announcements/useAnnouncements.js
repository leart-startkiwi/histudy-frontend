import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "../../services/apiAnnouncements";

export function useAnnouncements(courseId) {
  const { isLoading, data: announcements } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAnnouncements(courseId),
  });

  return { isLoading, announcements };
}
