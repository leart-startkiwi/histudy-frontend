function NewCourseMainBody({ header, description, children }) {
  return (
    <div className="mx-auto mt-36 w-1/2 py-1 text-center">
      <h2 className="text-3xl font-bold">{header}</h2>
      <p className="mt-7">{description}</p>
      {children}
    </div>
  );
}

export default NewCourseMainBody;
