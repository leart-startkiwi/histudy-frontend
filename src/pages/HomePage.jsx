import AboutUs from "../features/HomePage/AboutUs";
import Banner from "../features/HomePage/Banner";
import Cards from "../features/HomePage/Cards";
import PopularCourses from "../features/HomePage/PopularCourses";
import Categories from "../ui/Categories";

function HomePage() {
  return (
    <>
      <Banner />
      <Cards />
      <AboutUs />
      <Categories />
      <PopularCourses />
    </>
  );
}

export default HomePage;
