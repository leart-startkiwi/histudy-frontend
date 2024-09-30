import { useEffect } from "react";
import { useGetAllChats } from "../../reactQuery/chat/useGetAllChats";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { setAllChats, setUser } from "../../redux/messagesSlice";

function MessagesSidebar() {
  const { allChats } = useGetAllChats();
  const { user, allChats: allChatsRedux } = useSelector(
    (store) => store.messages,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllChats(allChats?.data));
  }, [allChats?.data, dispatch]);

  useEffect(() => {
    const firstChatUser = allChatsRedux?.at(0)?.user;
    if (!user && firstChatUser) {
      dispatch(
        setUser({
          first_name: firstChatUser?.first_name,
          last_name: firstChatUser?.last_name,
          userId: firstChatUser?.id,
        }),
      );
    }
  }, [dispatch, user, allChatsRedux]);

  return (
    <div className="fixed bottom-0 top-20 flex h-full w-1/4 flex-col border-r pt-2 ">
      {Array.isArray(allChatsRedux) &&
        [...allChatsRedux]
          ?.sort(
            (a, b) =>
              new Date(b?.lastMessage?.timestamp) -
              new Date(a?.lastMessage?.timestamp),
          )
          ?.map((message) => (
            <Message
              key={message._id}
              user={message?.user}
              lastMessage={message?.lastMessage}
            />
          ))}
    </div>
  );
}

export default MessagesSidebar;
