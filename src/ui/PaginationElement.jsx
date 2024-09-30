function PaginationElement({ children, customFn, currentPage, show }) {
  return (
    <div
      role="button"
      onClick={() => {
        customFn();
        window.scrollTo({ top: 300, behavior: "smooth" });
      }}
      className={`${+currentPage === +children ? "bg-blue-600 text-white" : "bg-white text-black"} ${show === false ? "cursor-not-allowed hover:bg-inherit" : "hover:cursor-pointer"} rounded-lg  px-5 py-3  shadow-md hover:bg-blue-600`}
    >
      {children}
    </div>
  );
}

export default PaginationElement;
