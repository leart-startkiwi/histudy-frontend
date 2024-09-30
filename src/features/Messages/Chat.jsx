import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useUser } from "../../reactQuery/useUser";
import { useEffect, useRef, useState } from "react";
import DefaultUserProfile from "../../ui/DefaultUserProfile";
import { useGetMessagesWithUser } from "../../reactQuery/chat/useGetMessagesWithUser";
import { setAllChats } from "../../redux/messagesSlice";
import { useQueryClient } from "@tanstack/react-query";

const socket = io("http://localhost:3000");
function Chat() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user: chatUser, allChats } = useSelector((store) => store.messages);
  const { user } = useUser();
  const [message, setMessage] = useState({ message: "", userId: user?.id });
  const [messages, setMessages] = useState([]);

  const messageContainerRef = useRef(null);

  const { messagesWithUser } = useGetMessagesWithUser(chatUser?.userId);

  const currentChat = allChats?.find(
    (chat) =>
      chat?.participants?.includes(user?.id) &&
      chat?.participants?.includes(chatUser?.userId),
  );

  useEffect(() => {
    const savedMessages = messagesWithUser?.data
      ?.at(0)
      ?.messages?.map((message) => ({
        message: message?.message,
        userId: message?.senderId,
      }));

    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, [messagesWithUser?.data]);

  useEffect(() => {
    socket.emit("register", user ? user.id : null);

    socket.on("chat-message", (data) => {
      console.log("leart46");
      const newMessage = {
        content: data.message,
        timestamp: new Date(),
        read: currentChat?.participants?.includes(data?.senderId)
          ? true
          : false,
        senderId: data?.senderId,
      };

      const newChat = allChats?.find(
        (chat) =>
          chat?.participants?.includes(user?.id) &&
          chat?.participants?.includes(data?.senderId),
      );

      if (!newChat) {
        setTimeout(() => {
          queryClient.refetchQueries({
            queryKey: ["allChats"],
          });
        }, 100);
      }

      const updatedChats = allChats.map((chat) => {
        if (
          chat?.participants?.includes(user?.id) &&
          chat?.participants?.includes(data?.senderId)
        ) {
          return {
            ...chat,
            lastMessage: newMessage,
          };
        }
        return chat;
      });

      dispatch(setAllChats(updatedChats));
      if (data.senderId === chatUser?.userId) {
        setMessages((prevMessages) => [...(prevMessages || []), data]);
      }
    });

    return () => {
      socket.off("chat-message");
    };
  }, [
    user,
    chatUser?.userId,
    allChats,
    dispatch,
    currentChat?.participants,
    queryClient,
  ]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    const newMessage = {
      content: message.message,
      timestamp: new Date(),
      read: true,
    };

    socket.emit("send-message", {
      recipientId: chatUser?.userId,
      message,
    });

    const newChat = allChats?.find(
      (chat) =>
        chat?.participants?.includes(user?.id) &&
        chat?.participants?.includes(chatUser?.userId),
    );

    if (!newChat) {
      setTimeout(() => {
        queryClient.refetchQueries({
          queryKey: ["allChats"],
        });
      }, 100);
    }

    const updatedChats = allChats.map((chat) => {
      if (
        chat?.participants?.includes(user?.id) &&
        chat?.participants?.includes(chatUser?.userId)
      ) {
        return {
          ...chat,
          lastMessage: newMessage,
        };
      }
      return chat;
    });

    dispatch(setAllChats(updatedChats));
    setMessage({ message: "", userId: user?.id });
    setMessages([...messages, message]);
  };

  return (
    <div className="relative ms-auto h-[91.5vh] w-3/4  pt-7">
      <div
        ref={messageContainerRef}
        className="flex h-[85vh] flex-col gap-y-2 overflow-y-auto pb-10"
      >
        {messages?.map((message, index) => (
          <div className="flex w-full items-center gap-x-2 px-2 " key={index}>
            {message?.userId !== user?.id && (
              <div title={`${chatUser?.first_name} ${chatUser?.last_name}`}>
                <DefaultUserProfile
                  widthHeight="h-8 w-8"
                  firstName={chatUser?.first_name}
                  lastName={chatUser?.last_name}
                />
              </div>
            )}
            <p
              className={`${message?.userId === user?.id && "ms-auto"} rounded-full border bg-gray-200 px-2 py-1`}
            >
              {message?.message}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="fixed bottom-5 left-[25.5%] right-5 rounded-full"
        placeholder="Message..."
        value={message?.message}
        onChange={(e) =>
          setMessage({ message: e.target.value, userId: user?.id })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
    </div>
  );
}

export default Chat;
