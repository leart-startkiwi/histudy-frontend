function Overlay({ customFn }) {
  const overlayClasses = `hover:cursor-default overlay fixed inset-0 bg-black bg-opacity-50 z-[499999]`;

  return (
    <div
      id="layer"
      role="button"
      onClick={() => {
        if (customFn) {
          customFn();
        }
      }}
      className={overlayClasses}
    ></div>
  );
}

export default Overlay;
