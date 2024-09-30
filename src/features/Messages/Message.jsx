import { useDispatch, useSelector } from "react-redux";
import DefaultUserProfile from "../../ui/DefaultUserProfile";
import { setUser } from "../../redux/messagesSlice";
import { useMarkMessageAsRead } from "../../reactQuery/chat/useMarkMessageAsRead";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function Message({ user, lastMessage }) {
  const dispatch = useDispatch();
  const { user: messagesUser } = useSelector((store) => store.messages);
  const { markMessageAsRead } = useMarkMessageAsRead();
  const queryClient = useQueryClient();

  const activeChat = user?.id === messagesUser?.userId;
  const activeChatUnread = activeChat && !lastMessage?.read;

  useEffect(() => {
    if (activeChatUnread) {
      markMessageAsRead(user?.id);
      setTimeout(() => {
        queryClient.refetchQueries({
          queryKey: ["allChats"],
        });
      }, 100);
    }
  }, [activeChatUnread, markMessageAsRead, queryClient, user?.id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setUser({
            first_name: user?.first_name,
            last_name: user?.last_name,
            userId: user?.id,
          }),
        );
        markMessageAsRead(user?.id);
        setTimeout(() => {
          queryClient.refetchQueries({
            queryKey: ["allChats"],
          });
        }, 100);
      }}
      role="button"
      className={`${activeChat && "bg-gray-200"} relative flex items-center gap-x-3 p-3 hover:bg-gray-200`}
    >
      {!lastMessage?.read && lastMessage?.senderId === user?.id && (
        <div className="absolute right-5 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-purple-600"></div>
      )}
      <DefaultUserProfile
        firstName={user?.first_name}
        lastName={user?.last_name}
        widthHeight="w-14 h-14"
      />
      <div className="flex flex-col gap-y-1">
        <p className="text-lg font-semibold capitalize">
          {user?.first_name} {user?.last_name}
        </p>
        <p>{lastMessage?.content}</p>
      </div>
    </div>
  );
}

export default Message;
