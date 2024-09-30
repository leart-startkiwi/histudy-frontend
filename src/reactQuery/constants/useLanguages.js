import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../../services/apiConstants";

export function useLanguages() {
  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  return { languages };
}
