import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function HomePageCard({ title, description, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex h-80 w-full max-w-lg flex-col gap-y-4 overflow-hidden rounded-xl border bg-white p-10 shadow-sm md:w-[48%] xl:w-[23%]"
    >
      <div
        className={`${isHovered ? "scale-95 transform bg-blue-600" : "bg-orange-500 "} relative z-10 h-16 w-16 rounded-xl p-5 text-3xl text-white`}
      >
        {children}
      </div>
      <p className="text-lg font-bold">{title}</p>
      <p className="text-sm text-stone-600">{description}</p>
      <p className="absolute top-[85%] text-orange-500 hover:cursor-pointer hover:text-blue-600">
        Read More{" "}
        <FontAwesomeIcon icon={faArrowRight} className="ms-2 text-blue-600" />
      </p>
      <div
        className={`${isHovered ? "bg-blue-600" : "bg-stone-100"} absolute bottom-0 right-0 h-14 w-14 rounded-tl-full`}
      ></div>
    </div>
  );
}

export default HomePageCard;
