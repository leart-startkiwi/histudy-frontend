import { forwardRef } from "react";

const DefaultUserProfile = forwardRef(
  ({ firstName, lastName, onClick, widthHeight, children }, ref) => {
    return (
      <div
        ref={ref || null}
        onClick={onClick}
        className={`${widthHeight ? widthHeight : "h-10 w-10"} flex cursor-pointer items-center justify-center rounded-full bg-gray-800 text-lg font-bold text-white`}
      >
        {firstName?.slice(0, 1).toUpperCase()}
        {lastName?.slice(0, 1).toUpperCase()}
        {children}
      </div>
    );
  },
);

DefaultUserProfile.displayName = "DefaultUserProfile";

export default DefaultUserProfile;
