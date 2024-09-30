import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiUsers";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
  });

  return { isLoading, signup };
}
