import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiUsers";
import { useNavigate } from "react-router";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      queryClient.setQueryData(["user"], response.data.user);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/");
    },
  });

  return { isLoading, login };
}
