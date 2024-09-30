import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "../services/apiCategories";
import toast from "react-hot-toast";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateCategory } = useMutation({
    mutationFn: (updateCategoryObj) =>
      updateCategoryApi(
        updateCategoryObj.id,
        updateCategoryObj.updateCategoryObj,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category updated successfully.");
    },
  });

  return { isLoading, updateCategory };
}
