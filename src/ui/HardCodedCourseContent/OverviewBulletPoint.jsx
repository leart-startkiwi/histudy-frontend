import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OverviewBulletPoint({ text }) {
  return (
    <p className="flex items-start gap-x-2">
      <span className="text-green-600">
        <FontAwesomeIcon icon={faCheck} />
      </span>
      {text}
    </p>
  );
}

export default OverviewBulletPoint;
