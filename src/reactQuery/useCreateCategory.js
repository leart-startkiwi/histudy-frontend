import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "../services/apiCategories";
import toast from "react-hot-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: createCategory } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["categories"],
      // });
    },
  });

  return { isLoading, createCategory };
}
