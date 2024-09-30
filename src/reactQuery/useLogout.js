import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiUsers";
import { useNavigate } from "react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("accessToken");

      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["cart"], null);
      queryClient.setQueryData(["likes"], null);

      navigate("/");
    },
  });

  return { isLoading, logout };
}
