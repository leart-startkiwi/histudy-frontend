function HoveredDropdown({
  children,
  rightPosition,
  leftPosition,
  width,
  xPadding,
  yPadding,
}) {
  const conditionalStyle = `${rightPosition && rightPosition} ${leftPosition && leftPosition} ${width ? width : "w-72"} ${xPadding ? xPadding : "px-5"} ${yPadding ? yPadding : "py-7"}`;

  return (
    <div
      className={`${conditionalStyle} unselectable absolute top-full z-20 flex w-72 flex-col rounded-lg border bg-white text-base text-black shadow-md hover:cursor-default`}
    >
      {children}
    </div>
  );
}

export default HoveredDropdown;
