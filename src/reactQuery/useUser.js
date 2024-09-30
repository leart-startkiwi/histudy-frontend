import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export function useUser() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const user = jwtDecode(localStorage.getItem("accessToken"));
      return user;
    },
  });

  return { user };
}
