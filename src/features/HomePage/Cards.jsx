import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageCard from "../../ui/HomePageCard";
import { faBook, faGlobe, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

function Cards() {
  return (
    <section className="mx-auto mt-28 flex flex-col items-center gap-y-5 px-3 md:w-[90%] md:flex-row md:flex-wrap md:justify-between">
      <HomePageCard
        title="Exclusive Coach"
        description="Unlock personalized guidance for success. Tailored mentorship to amplify your learning journey."
      >
        <FontAwesomeIcon icon={faBook} className="mb-2" />
      </HomePageCard>

      <HomePageCard
        title="Creative Minds"
        description="Unleash creativity with our program. Join a vibrant community."
      >
        <FontAwesomeIcon icon={faLightbulb} className="mb-2" />
      </HomePageCard>

      <HomePageCard
        title="Video Tutorials"
        description="Simplify learning with concise videos. Accessible anytime, anywhere."
      >
        <FontAwesomeIcon icon={faVideo} className="-ms-1 mb-2" />
      </HomePageCard>

      <HomePageCard
        title="Worlds Record"
        description="Achieve greatness with our world-class courses. Reach new heights today."
      >
        <FontAwesomeIcon icon={faGlobe} className="-ms-1 mb-2" />
      </HomePageCard>
    </section>
  );
}

export default Cards;
