import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../../services/apiQuestions";

export function useQuestions(courseId, params) {
  const { isLoading, data: questions } = useQuery({
    queryKey: ["questions", courseId, params],
    queryFn: () => getQuestions(courseId, params),
  });

  return { isLoading, questions };
}
