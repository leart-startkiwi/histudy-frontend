import { useMutation } from "@tanstack/react-query";
import { createAnnouncement as createAnnouncementApi } from "../../services/apiAnnouncements";

export function useCreateAnnouncement() {
  const { isLoading, mutate: createAnnouncement } = useMutation({
    mutationFn: createAnnouncementApi,
  });

  return { isLoading, createAnnouncement };
}
