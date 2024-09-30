function CourseModalPill({ text, activePill, setActivePill }) {
  return (
    <button
      type="button"
      onClick={() => setActivePill(text)}
      className={`${activePill === text ? "bg-blue-600 text-white" : "bg-stone-100 text-black"} rounded-full  px-11 py-2 font-medium hover:bg-blue-600 hover:text-white`}
    >
      {text}
    </button>
  );
}

export default CourseModalPill;
