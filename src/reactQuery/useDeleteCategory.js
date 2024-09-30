import toast from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "../services/apiCategories";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success("Category deleted successfully.");
    },
  });

  return { isLoading, deleteCategory };
}
