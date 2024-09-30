import { useQuery } from "@tanstack/react-query";
import { getSkillLevels } from "../services/apiConstants";

export function useSkillLevels() {
  const { isLoading, data: skillLevels } = useQuery({
    queryKey: ["skillLevels"],
    queryFn: getSkillLevels,
  });

  return { isLoading, skillLevels };
}
