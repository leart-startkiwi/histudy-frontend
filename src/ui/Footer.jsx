import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const linkStyle = `hover:cursor-pointer hover:text-blue-600 hover:underline hover:underline-offset-4`;

function Footer({ courseLanding = false }) {
  const { showSidebar } = useSelector((store) => store.manageCourse);

  const location = useLocation();
  const messagesRoute = location?.pathname === "/messages";

  if (messagesRoute) return null;

  return (
    <>
      <div
        className={`${courseLanding && showSidebar ? "right-[22%]" : "right-0"} absolute bottom-0 left-0 flex flex-col gap-y-5  px-3 pb-5 md:flex-row md:flex-wrap md:items-center md:justify-center lg:items-start`}
      >
        <hr className="mb-7 w-full border border-gray-300"></hr>
        <div className=" flex flex-col gap-y-3 md:w-[40%] lg:w-[20%]">
          <Logo />
          <p className="text-stone-500">
            We’re always in search for talented and motivated people. Don’t be
            shy introduce yourself!
          </p>
          <button className="border-gradient w-fit transform rounded-full px-7 py-3 hover:-translate-y-1">
            Contact With Us{" "}
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </button>
        </div>

        <div className=" md:w-[40%] md:px-16 lg:w-[20%] ">
          <p className="mb-3 text-lg font-bold">Links</p>
          <div className="flex flex-col gap-y-3 text-stone-500">
            <p className={linkStyle}>Marketplace</p>
            <p className={linkStyle}>Kindergarten</p>
            <p className={linkStyle}>University</p>
            <p className={linkStyle}>Gym Coaching</p>
            <p className={linkStyle}>FAQ</p>
          </div>
        </div>

        <div className="md:w-[40%] lg:w-[20%]">
          <p className="mb-3 text-lg font-bold">Our Company</p>
          <div className="flex flex-col gap-y-3 text-stone-500 ">
            <p className={linkStyle}>Contact Us</p>
            <p className={linkStyle}>Become Teacher</p>
            <p className={linkStyle}>Blog</p>
            <p className={linkStyle}>Instructor</p>
            <p className={linkStyle}>Events</p>
          </div>
        </div>

        <div className="text-nowrap md:w-[40%] md:px-16 lg:w-[20%]">
          <p className="mb-3 text-lg font-bold">Get Contact</p>
          <div className="flex flex-col gap-y-3 text-stone-500 ">
            <div className="flex items-center gap-x-1">
              <label className="font-medium text-stone-700">Phone:</label>
              <p className={linkStyle}>+383 (45) 359 900</p>
            </div>

            <div className="flex items-center gap-x-1">
              <label className="font-medium text-stone-700">E-mail:</label>
              <a href="mailto:leartshabani77@gmail.com" className={linkStyle}>
                leartshabani77@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-x-1">
              <label className="font-medium text-stone-700">Location:</label>
              <p className={linkStyle}>Gjilan, Kosovo</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-x-3">
            <FontAwesomeIcon
              icon={faFacebook}
              className="hover:cursor-pointer hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="hover:cursor-pointer hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="hover:cursor-pointer hover:text-blue-600"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              className="hover:cursor-pointer hover:text-blue-600"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-stone-500 md:mt-5">
          <p className={linkStyle}>Terms of service</p>
          <p className={linkStyle}>Privacy policy</p>
          <p className={linkStyle}>Subscription</p>
          <p className={linkStyle}>Login & Register</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
