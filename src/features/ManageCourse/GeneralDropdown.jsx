function GeneralDropdown({ chosen, customFn, data, width, top }) {
  return (
    <div
      className={`${width && width} ${top ? top : "top-14"} absolute left-0 right-0 z-[500000] flex max-h-96 flex-col overflow-auto border`}
    >
      {data?.map((item) => (
        <button
          key={item.id}
          onClick={() => customFn(item)}
          className={`${item?.name?.toLowerCase() === chosen?.toLowerCase() ? "bg-blue-500 text-white" : "bg-white text-stone-500 hover:bg-gray-200 hover:text-blue-600"} py-3 ps-5 text-start font-medium`}
        >
          <span className="capitalize">{item.name}</span>
        </button>
      ))}
    </div>
  );
}

export default GeneralDropdown;
