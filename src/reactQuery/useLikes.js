import { useQuery } from "@tanstack/react-query";
import { getLikedCourses } from "../services/apiLikes";
import { useUser } from "./useUser";

export function useLikes() {
  const { user } = useUser();

  const { isLoading, data: likedCourses } = useQuery({
    queryKey: ["likes"],
    queryFn: getLikedCourses,
    enabled: !!user,
  });

  return { isLoading, likedCourses };
}
