import { useLocation, useNavigate } from "react-router";

function CourseNavigationLink({ text }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.hash.slice(1).toLowerCase() === text.toLowerCase();

  return (
    <p
      role="button"
      onClick={() => navigate(`${location.pathname}#${text}`)}
      className={`${isActive ? "text-black underline underline-offset-[13px]" : "hover:cursor-pointer hover:text-black"}`}
      style={{ textDecorationThickness: "2px" }}
    >
      {text}
    </p>
  );
}

export default CourseNavigationLink;
