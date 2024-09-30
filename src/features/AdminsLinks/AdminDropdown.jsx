import { Link } from "react-router-dom";
import DefaultUserProfile from "../../ui/DefaultUserProfile";
import { useLogout } from "../../reactQuery/useLogout";
import { useGetAllChats } from "../../reactQuery/chat/useGetAllChats";

function AdminDropdown({ user }) {
  const { allChats } = useGetAllChats();
  const { logout } = useLogout();

  const unreadMessages = allChats?.data?.filter(
    (chat) =>
      !chat?.lastMessage?.read && chat?.lastMessage?.senderId !== user?.id,
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-3 border-b pb-5 ps-5">
        <DefaultUserProfile
          widthHeight="w-16 h-16"
          firstName={user.first_name}
          lastName={user.last_name}
        />
        <div className="flex flex-col">
          <p className="capitalize text-black">{user.first_name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <Link
        to="/my-courses/learning"
        className="rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
      >
        My learning
      </Link>
      <Link
        to="/cart"
        className="rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
      >
        My cart
      </Link>
      <Link
        to="/messages"
        className="relative flex items-center justify-between rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
      >
        <span>Messages</span>{" "}
        {unreadMessages?.length ? (
          <div className="absolute right-5  h-6 w-6 rounded-full bg-purple-600 pt-[0.15rem] text-center text-sm font-semibold text-white">
            {unreadMessages?.length}
          </div>
        ) : null}
      </Link>
      <Link
        to="/instructor/courses"
        className="rounded-md border-b py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
      >
        Instructor dashboard
      </Link>
      <Link
        to="/courses/admin"
        className="rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
      >
        Edit profile
      </Link>
      <button
        onClick={() => logout({ user_id: user.id })}
        to="/courses/admin"
        className="rounded-md py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDropdown;
