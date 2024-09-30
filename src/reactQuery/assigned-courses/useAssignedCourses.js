import { useQuery } from "@tanstack/react-query";
import { getAssignedCourses } from "../../services/apiAssignedCourses";
import { useUser } from "../useUser";

export function useAssignedCourses() {
  const { user } = useUser();
  const { isLoading, data: assignedCourses } = useQuery({
    queryKey: ["assignedCourses"],
    queryFn: getAssignedCourses,
    enabled: !!user,
  });

  return { isLoading, assignedCourses };
}
