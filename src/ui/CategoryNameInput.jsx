function CategoryNameInput({ register, error, requestError, setRequestError }) {
  return (
    <div className="relative mt-5">
      <input
        onKeyDown={() => {
          if (requestError) {
            setRequestError("");
          }
        }}
        {...register("name", {
          required: "Category name is required",
        })}
        type="text"
        id="name"
        className={`${error && "border-red-600"} peer block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500`}
        placeholder=" "
      />
      <label
        htmlFor="name"
        className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
      >
        Category Name
      </label>
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
}

export default CategoryNameInput;
