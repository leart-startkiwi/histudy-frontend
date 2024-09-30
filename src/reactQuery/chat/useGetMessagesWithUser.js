import { useQuery } from "@tanstack/react-query";
import { getMessagesWithUser } from "../../services/apiChat";

export function useGetMessagesWithUser(userId) {
  const { isLoading, data: messagesWithUser } = useQuery({
    queryKey: ["messagesWithUser", userId],
    queryFn: () => getMessagesWithUser(userId),
  });

  return { isLoading, messagesWithUser };
}
