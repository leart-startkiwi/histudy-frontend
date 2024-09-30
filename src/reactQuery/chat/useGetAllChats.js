import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "../../services/apiChat";

export function useGetAllChats() {
  const { isLoading, data: allChats } = useQuery({
    queryKey: ["allChats"],
    queryFn: getAllChats,
  });

  return { isLoading, allChats };
}
