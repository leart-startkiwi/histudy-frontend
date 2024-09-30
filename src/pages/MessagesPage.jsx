import { useEffect } from "react";
import Chat from "../features/Messages/Chat";
import MessagesSidebar from "../features/Messages/MessagesSidebar";

function MessagesPage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <MessagesSidebar />
      <Chat />
    </>
  );
}

export default MessagesPage;
