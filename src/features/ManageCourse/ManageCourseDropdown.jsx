function ManageCourseDropdown({ data, customFn }) {
  return (
    <div className="flex w-full flex-col">
      {data?.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            customFn;
          }}
          className="rounded-md bg-white py-3 ps-5 text-start font-medium text-stone-500 hover:bg-stone-50 hover:text-blue-600"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default ManageCourseDropdown;
