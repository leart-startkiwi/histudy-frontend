function CourseModalBody({ title, secondTitle, children }) {
  return (
    <div className="mt-5 h-fit w-[70%] rounded-md bg-white p-7 shadow-sm">
      <div className="flex items-center">
        <h2 className="mb-3 w-1/2 text-xl font-bold">{title}</h2>
        <h2 className="mb-3 ms-36 w-1/2 text-xl font-bold">{secondTitle}</h2>
      </div>
      <hr></hr>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default CourseModalBody;
