import { faBell, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faLayerGroup,
  faMagnifyingGlass,
  faShoppingCart,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import AdminDropdown from "../features/AdminsLinks/AdminDropdown";
import CartDropdown from "../features/NavbarDropdowns/CartDropdown";
import CategoriesDropdown from "../features/NavbarDropdowns/CategoriesDropdown";
import LikedCoursesDropdown from "../features/NavbarDropdowns/LikedCoursesDropdown";
import SearchingModal from "../features/Searching/SearchingModal";
import SearchInput from "../features/Searching/SearchInput";
import { useDropdownCloser } from "../hooks/useDropdownCloser";
import { useModalCloser } from "../hooks/useModalCloser";
import { useLikes } from "../reactQuery/useLikes";
import { useUser } from "../reactQuery/useUser";
import HoveredDropdown from "./HoveredDropdown";
import Logo from "./Logo";
import { useCart } from "../reactQuery/cart/useCart";
import DefaultUserProfile from "../ui/DefaultUserProfile";
import MyLearningDropdown from "../features/NavbarDropdowns/MyLearningDropdown";
import { useGetAllChats } from "../reactQuery/chat/useGetAllChats";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

const socket = io("http://localhost:3000");

function Navbar() {
  const queryClient = useQueryClient();
  const { allChats } = useGetAllChats();

  const [clickedModal, setClickedModal] = useModalCloser();
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const location = useLocation();

  const { user } = useUser();
  const { likedCourses } = useLikes();
  const { cart } = useCart();

  const unreadMessages = allChats?.data?.filter(
    (chat) =>
      !chat?.lastMessage?.read && chat?.lastMessage?.senderId !== user?.id,
  );

  const {
    elementRef: adminDropdownButton,
    showDropdown: showAdminDropdown,
    setShowDropdown: setShowAdminDropdown,
  } = useDropdownCloser();

  const {
    elementRef: likesDropdownButton,
    showDropdown: showLikesDropdown,
    setShowDropdown: setShowLikesDropdown,
  } = useDropdownCloser();

  const {
    elementRef: cartDropdownButton,
    showDropdown: showCartDropdown,
    setShowDropdown: setShowCartDropdown,
  } = useDropdownCloser();

  const {
    elementRef: mylearningDropdownButton,
    showDropdown: showMyLearningDropdown,
    setShowDropdown: setShowMyLearningDropdown,
  } = useDropdownCloser();

  const circleStyle = `${!showLikesDropdown ? "bg-transparent" : ""} flex h-10 w-10 items-center justify-center rounded-full  hover:cursor-pointer hover:bg-stone-100 hover:text-blue-600 text-xl`;

  // useEffect(() => {
  //   if (location.pathname !== "/messages") {
  //     socket.emit("register", user ? user.id : null);

  //     socket.on("chat-message", () => {
  //       setTimeout(() => {
  //         queryClient.refetchQueries({
  //           queryKey: ["allChats"],
  //         });
  //       }, 100);
  //     });

  //     return () => {
  //       socket.off("chat-message");
  //     };
  //   }
  // }, [queryClient, user, location.pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm">
      <nav className="flex items-center justify-between px-3 py-5 md:px-10">
        <div className="flex items-center gap-x-4">
          <Logo />
          <button
            onMouseEnter={() => setShowCategoriesDropdown(true)}
            onMouseLeave={() => setShowCategoriesDropdown(false)}
            className="relative hidden rounded-full bg-stone-100 px-5 py-3 lg:block"
          >
            <FontAwesomeIcon icon={faLayerGroup} className="text-lg" />{" "}
            Categories
            {showCategoriesDropdown && (
              <HoveredDropdown leftPosition="left-0">
                <CategoriesDropdown
                  from="/"
                  setShowCategoriesDropdown={setShowCategoriesDropdown}
                />
              </HoveredDropdown>
            )}
          </button>
        </div>
        {location.pathname !== "/courses" &&
          location.pathname !== "/courses/admin" && <SearchInput />}
        <div className="flex items-center gap-x-4 text-lg md:gap-x-7">
          <div
            role="button"
            onClick={() => setClickedModal(true)}
            className={`${circleStyle} lg:hidden`}
          >
            {clickedModal ? (
              <FontAwesomeIcon icon={faXmark} />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} role="button" />
            )}
          </div>
          {user && (
            <div
              className="relative"
              ref={mylearningDropdownButton}
              onClick={() => setShowMyLearningDropdown(!showMyLearningDropdown)}
            >
              <p className="text-base hover:cursor-pointer hover:text-blue-600">
                My learning
              </p>
              {showMyLearningDropdown && (
                <HoveredDropdown
                  width="w-96"
                  rightPosition="right-0"
                  xPadding="px-0"
                  yPadding="py-4"
                  onClickOutside={() => setShowMyLearningDropdown(false)}
                >
                  <MyLearningDropdown />
                </HoveredDropdown>
              )}
            </div>
          )}
          {user && (
            <div
              onClick={() => setShowLikesDropdown(!showLikesDropdown)}
              className={`${showLikesDropdown && "bg-stone-100 text-blue-600"} ${circleStyle} relative hidden transition-none lg:flex`}
              ref={likesDropdownButton}
            >
              {likedCourses?.likedCourses?.length ? (
                <div className="absolute inset-0 -top-[0.3rem] left-6 h-6 w-6 rounded-full bg-purple-600 pt-[0.15rem] text-center text-sm font-semibold text-white">
                  {likedCourses.likedCourses?.length}
                </div>
              ) : null}
              <FontAwesomeIcon icon={faHeart} className="transition-none" />
              {showLikesDropdown && (
                <HoveredDropdown
                  width="w-96"
                  rightPosition="right-0"
                  xPadding="px-0"
                  yPadding="py-4"
                  onClickOutside={() => setShowLikesDropdown(false)}
                >
                  <LikedCoursesDropdown />
                </HoveredDropdown>
              )}
            </div>
          )}
          <div
            onClick={() => setShowCartDropdown(!showCartDropdown)}
            className={`${showCartDropdown && "bg-stone-100 text-blue-600"} ${circleStyle} relative transition-none `}
            ref={cartDropdownButton}
          >
            {cart?.results ? (
              <div className="absolute inset-0 -top-[0.3rem] left-6 h-6 w-6 rounded-full bg-purple-600 pt-[0.15rem] text-center text-sm font-semibold text-white">
                {cart.results}
              </div>
            ) : null}
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="transition-none"
            />
            {showCartDropdown && (
              <HoveredDropdown
                width="w-96"
                rightPosition="right-0"
                xPadding="px-0"
                yPadding="py-4"
                onClickOutside={() => setShowCartDropdown(false)}
              >
                <CartDropdown cart={cart} />
              </HoveredDropdown>
            )}
          </div>
          {user && (
            <div className={`${circleStyle} hidden lg:flex`}>
              <FontAwesomeIcon icon={faBell} />
            </div>
          )}

          {!user && (
            <Link
              to="/login"
              className="border border-black px-5 py-2 text-base font-semibold hover:bg-gray-200"
            >
              Login
            </Link>
          )}

          {!user && (
            <Link
              to="/signup"
              className="border border-black bg-gray-800 px-5 py-2 text-base font-semibold text-white hover:bg-gray-700"
            >
              Sign up
            </Link>
          )}

          {user &&
            (user.image ? (
              <img src={user.image} className="h-20 w-20 rounded-full" />
            ) : (
              <div className="relative">
                <DefaultUserProfile
                  ref={adminDropdownButton}
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  firstName={user.first_name}
                  lastName={user.last_name}
                >
                  {showAdminDropdown && (
                    <HoveredDropdown
                      width="w-96"
                      rightPosition="right-10"
                      xPadding="px-0"
                      yPadding="py-4"
                    >
                      <AdminDropdown user={user} />
                    </HoveredDropdown>
                  )}
                </DefaultUserProfile>
                {unreadMessages?.length ? (
                  <div className="absolute inset-0 -top-[0.7rem] left-6 h-6 w-6 rounded-full bg-purple-600 pt-[0.15rem] text-center text-sm font-semibold text-white">
                    {unreadMessages?.length}
                  </div>
                ) : null}
              </div>
            ))}

          <div className={`${circleStyle} lg:hidden`}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>
      {clickedModal && <SearchingModal setClickedModal={setClickedModal} />}
    </header>
  );
}

export default Navbar;
