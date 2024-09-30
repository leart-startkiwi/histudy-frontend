import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDropdownCloser } from "../../hooks/useDropdownCloser";
import { useUser } from "../../reactQuery/useUser";
import DefaultUserProfile from "../../ui/DefaultUserProfile";
import HoveredDropdown from "../../ui/HoveredDropdown";
import AdminDropdown from "../AdminsLinks/AdminDropdown";

function Navbar() {
  const { user } = useUser();

  const circleStyle = `flex h-10 w-10 items-center justify-center rounded-full  hover:cursor-pointer hover:bg-stone-100 hover:text-blue-600 text-xl`;

  const {
    elementRef: adminDropdownButton,
    showDropdown: showAdminDropdown,
    setShowDropdown: setShowAdminDropdown,
  } = useDropdownCloser();

  return (
    <div className="fixed right-7 top-3 z-50 ms-auto flex items-center gap-x-5 bg-stone-50 ">
      <Link to="/" className="hover:text-blue-600">
        Student
      </Link>
      <div className={`${circleStyle} hidden lg:flex`}>
        <FontAwesomeIcon icon={faBell} />
      </div>

      {user &&
        (user.image ? (
          <img src={user.image} className="h-20 w-20 rounded-full" />
        ) : (
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
        ))}
    </div>
  );
}

export default Navbar;
