import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

function roundToHalf(num) {
  return Math.round(num * 2) / 2;
}

function Stars({ reviews, ratings, showAvg = true, showNonFilled = false }) {
  const rating = roundToHalf(ratings);
  const fullStars = Array.from({ length: Math.floor(rating) }, (_, i) => i);

  const leftStars = Array.from({ length: 5 - fullStars.length }, (_, i) => i);

  const fiveStars = Array.from({ length: 5 }, (_, i) => i);

  if (isNaN(ratings)) {
    return (
      <div className="flex items-center">
        {fiveStars?.map((i) => (
          <FontAwesomeIcon
            key={i}
            icon={emptyStar}
            className="text-sm text-orange-500"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {showAvg && ratings && (
        <p className="mr-1 font-semibold">{parseFloat(ratings).toFixed(1)}</p>
      )}
      {ratings &&
        fullStars.map((i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-sm text-orange-500"
          />
        ))}
      {ratings &&
        fullStars.length <= 4 &&
        (leftStars.length !== 1 || fullStars.length - rating === 0) &&
        showNonFilled &&
        leftStars.map((i) => (
          <FontAwesomeIcon
            key={i}
            icon={emptyStar}
            className="text-sm text-orange-500"
          />
        ))}
      {ratings && fullStars.length - rating !== 0 && (
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="text-sm text-orange-500"
        />
      )}
      {reviews ? (
        <p className="ms-3 text-stone-500">({reviews} Reviews)</p>
      ) : null}
    </div>
  );
}

export default Stars;
