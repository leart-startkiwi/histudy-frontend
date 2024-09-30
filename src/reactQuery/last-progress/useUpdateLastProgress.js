import { useMutation } from "@tanstack/react-query";
import { updateLastProgress as updateLastProgressApi } from "../../services/apiLastProgress";

export function useUpdateLastProgress() {
  const { isLoading, mutate: updateLastProgress } = useMutation({
    mutationFn: (updateLastProgressObj) =>
      updateLastProgressApi(
        updateLastProgressObj.id,
        updateLastProgressObj.updateLastProgressObj,
      ),
  });
  return { isLoading, updateLastProgress };
}
