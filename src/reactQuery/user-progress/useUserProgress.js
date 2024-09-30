import { useQuery } from "@tanstack/react-query";
import { getUserProgress } from "../../services/apiUserProgress";

export function useUserProgress(courseId) {
  const { isLoading, data: userProgress } = useQuery({
    queryKey: ["userProgress"],
    queryFn: () => getUserProgress(courseId),
  });

  return { isLoading, userProgress };
}
