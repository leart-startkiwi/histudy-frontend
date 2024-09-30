import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="homeBanner min-h-[91vh] w-full px-7 pb-5">
      <div className="flex items-center gap-x-10">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-y-7  pt-24">
          <h1 className="text-4xl font-bold  text-white md:text-5xl lg:text-6xl">
            A Better Learning Journey Future Starts Here
          </h1>
          <div className="unselectable w-2/3 rounded-md bg-white px-3 py-3 opacity-85 shadow-sm lg:py-4">
            🏆 The Leader in Online Learning
          </div>
          <div className="flex items-center gap-x-5">
            <button className="rounded-md border bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600 lg:py-4 ">
              Get Started
            </button>
            <Link
              to="/courses"
              className="rounded-md border px-5 py-3 font-bold text-white hover:scale-105 hover:transform lg:py-4"
            >
              Explore Courses <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
        <img
          src="./students.png"
          className="mx-auto mt-10 hidden max-w-lg rounded-full border-[30px] border-orange-500 lg:mt-40 lg:block"
        />
      </div>
      <img
        src="./students.png"
        className="mx-auto mt-10 block w-full max-w-xl rounded-full border-[30px] border-orange-500 lg:hidden"
      />
    </section>
  );
}

export default Banner;
