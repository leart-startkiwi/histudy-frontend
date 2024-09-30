function CourseStatusBadge({ price }) {
  let backgroundColorClass;

  if (+price === 0) {
    backgroundColorClass = "bg-green-400";
  } else if (+price > 0) {
    backgroundColorClass = "bg-blue-400";
  }

  return (
    <div
      className={`absolute -right-2 -top-2 z-10 rounded-md ${backgroundColorClass} p-1`}
    >
      <div className="px-5 text-sm font-bold capitalize text-white">
        {price && +price !== 0 ? `$${price}` : "Free"}
      </div>
    </div>
  );
}

export default CourseStatusBadge;
