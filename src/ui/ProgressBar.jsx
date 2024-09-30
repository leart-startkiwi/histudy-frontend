function ProgressBar({
  percentage,
  progressColor = "bg-purple-600",
  fullBarColor = "rgb(209, 215, 220)",
  height = "h-1",
}) {
  return (
    <div
      className={`relative w-full ${height}`}
      style={{ backgroundColor: fullBarColor }}
    >
      <div
        className={`absolute left-0 h-full ${progressColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
