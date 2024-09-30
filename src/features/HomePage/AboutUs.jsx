import {
  faArrowRight,
  faChalkboardTeacher,
  faHeadset,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUsCard from "../../ui/AboutUsCard";
import GradientButton from "../../ui/GradientButton";
import HomeSectionIntro from "../../ui/HomeSectionIntro";

function AboutUs() {
  return (
    <section className="mx-auto mt-20 flex flex-col px-3 md:w-[90%] xl:flex-row xl:items-center xl:justify-between">
      <article className="xl:w-1/2">
        <div className="relative mx-auto flex w-fit items-center md:w-3/4 xl:w-full">
          <img src="aboutImage2.png" className="mx-auto w-full max-w-xl" />
          <div className="absolute left-10 top-[75%] rounded-lg bg-white px-16 py-8 shadow-md">
            <div className="absolute -left-8 h-16 w-16 rounded-full bg-orange-500 text-3xl font-bold text-white">
              <FontAwesomeIcon icon={faHeadset} className="ms-4 mt-4" />
            </div>
            <p className="text-sm font-medium text-stone-600">
              Need to Know More Details?
            </p>
            <p className="mt-3 text-2xl font-bold text-blue-600 hover:cursor-pointer hover:text-orange-500">
              +383 (45) 359 900
            </p>
          </div>
        </div>
      </article>

      <article className="xl:w-1/2">
        <HomeSectionIntro section="About Us" />
        <h2 className="mt-5 text-center text-4xl font-semibold">
          Creating a Lifelong Learning Best Community
        </h2>
        <p className="mt-7 text-sm text-stone-600">
          Welcome to HiStudy, your premier destination for transformative
          e-learning experiences. Dive into our rich curriculum, expertly
          crafted to empower learners of all backgrounds. Join us on a journey
          of discovery and growth as we unlock your full potential together.
        </p>

        <section className="mx-auto my-10 flex flex-col items-center gap-y-5 px-3 md:flex-row md:flex-wrap md:justify-between">
          <AboutUsCard
            title="Flexible Classes"
            description="Experience the freedom of learning with our 'Flexible Classes' option. Tailor your education to fit your schedule and preferences, ensuring you can pursue your goals at your own pace."
          >
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="-ms-2 mb-2"
            />
          </AboutUsCard>

          <AboutUsCard
            title="Live Class From Anywhere"
            description="Embark on interactive learning adventures with our 'Live Class from Anywhere' feature. Connect with instructors and peers in real-time from the comfort of your chosen space, enabling seamless participation and engagement no matter where you are."
          >
            <FontAwesomeIcon icon={faLaptop} className="-ms-2 mb-2" />
          </AboutUsCard>
        </section>

        <GradientButton text="Discover More" xPosition="ms-3">
          <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </GradientButton>
      </article>
    </section>
  );
}

export default AboutUs;
