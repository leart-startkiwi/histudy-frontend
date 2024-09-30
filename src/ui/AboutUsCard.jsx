import { useState } from "react";

function AboutUsCard({ title, description, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="mt-7 flex h-72 w-full flex-col gap-y-4 rounded-xl border-b-[1px] border-l-2 border-r-2 border-t-2 border-orange-600 border-opacity-60 bg-white p-10 md:h-44 md:flex-row md:items-center md:gap-x-5"
    >
      <div
        className={`${isHovered && "scale-95 transform"} relative z-10 h-16 w-16 rounded-xl bg-gray-100 p-5 text-3xl text-blue-600`}
      >
        {children}
      </div>
      <div>
        <p className="mb-4 text-lg font-bold">{title}</p>
        <p className="text-sm text-stone-600">{description}</p>
      </div>
    </div>
  );
}

export default AboutUsCard;
