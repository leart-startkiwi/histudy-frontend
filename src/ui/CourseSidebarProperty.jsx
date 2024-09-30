function CourseSidebarProperty({ property, value }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-stone-500">{property}</p>
        <p className="rounded-md bg-stone-100 p-1 text-xs  font-medium text-stone-500">
          {value}
        </p>
      </div>
      <hr></hr>
    </>
  );
}

export default CourseSidebarProperty;
