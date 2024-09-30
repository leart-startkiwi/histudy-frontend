import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import GeneralDropdownContainer from "../../features/ManageCourse/GeneralDropdownContainer";
import { useCategories } from "../../reactQuery/useCategories";
import { removeAllStatuses } from "../../redux/activeStatusesSlice";
import { setCategory } from "../../redux/searchSlice";
import { useLanguages } from "../../reactQuery/constants/useLanguages";
import { useStatuses } from "../../reactQuery/useStatuses";

const sortUrl = (sort) => {
  switch (sort) {
    case "Most Reviewed":
      return "reviews_count";
    case "Highest Rated":
      return "highest_rated";
    case "Newest":
      return "newest";
  }
};

const sortText = (sort) => {
  switch (sort) {
    case "reviews_count":
      return "Most Reviewed";
    case "highest_rated":
      return "Highest Rated";
    case "newest":
      return "Newest";
  }
};

function Filters() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { languages } = useLanguages();
  const { statuses } = useStatuses();

  const { categories } = useCategories();

  const dispatch = useDispatch();

  const categoryLabel = searchParams?.get("category")
    ? searchParams.get("category")
    : "Select Category";

  const priceLabel = searchParams?.get("price")
    ? searchParams.get("price")
    : "Select Price";

  const languageLabel = searchParams?.get("language")
    ? searchParams.get("language")
    : "Select Language";

  const levelLabel = searchParams?.get("level")
    ? searchParams.get("level")
    : "Select Level";

  const sortLabel = searchParams?.get("sort")
    ? sortText(searchParams.get("sort"))
    : "Most Reviewed";

  return (
    <>
      <hr></hr>

      <div className="flex flex-col gap-y-5 lg:flex-row lg:items-center lg:gap-x-5 ">
        <div className="mr-28 flex w-[12%] flex-col gap-y-3">
          <p className="text-sm font-semibold uppercase ">Sort By</p>
          <GeneralDropdownContainer
            chosen={sortLabel}
            placeholder={sortLabel}
            showDropdown={showSortDropdown}
            setShowDropdown={setShowSortDropdown}
            width="w-full"
            customFn={(item) => {
              setShowSortDropdown(false);
              searchParams.set("sort", sortUrl(item.name));
              setSearchParams(searchParams);
            }}
            data={[
              { id: "most-reviewed", name: "Most Reviewed" },
              { id: "highest-rated", name: "Highest Rated" },
              { id: "newest", name: "Newest" },
            ]}
          />
        </div>
        <div className="flex w-1/5 flex-col gap-y-3">
          <p className="text-sm font-semibold uppercase ">Category</p>
          <GeneralDropdownContainer
            chosen={categoryLabel}
            placeholder={categoryLabel}
            showDropdown={showCategoryDropdown}
            setShowDropdown={setShowCategoryDropdown}
            width="w-full"
            customFn={(item) => {
              setShowCategoryDropdown(false);
              searchParams.set("category", item.name);
              setSearchParams(searchParams);
              dispatch(setCategory(item));
            }}
            data={categories?.data}
          />
        </div>

        <div className="flex w-1/6 flex-col gap-y-3">
          <p className="text-sm font-semibold uppercase ">Language</p>
          <GeneralDropdownContainer
            chosen={languageLabel}
            placeholder={languageLabel}
            showDropdown={showLanguageDropdown}
            setShowDropdown={setShowLanguageDropdown}
            width="w-full"
            customFn={(item) => {
              setShowLanguageDropdown(false);
              searchParams.set("language", item.name);
              setSearchParams(searchParams);
            }}
            data={languages?.data}
          />
        </div>

        <div className="flex w-1/6 flex-col gap-y-3">
          <p className="text-sm font-semibold uppercase ">Level</p>
          <GeneralDropdownContainer
            chosen={levelLabel}
            placeholder={levelLabel}
            showDropdown={showLevelDropdown}
            setShowDropdown={setShowLevelDropdown}
            width="w-full"
            customFn={(item) => {
              setShowLevelDropdown(false);
              searchParams.set("level", item.name);
              setSearchParams(searchParams);
            }}
            data={statuses?.data}
          />
        </div>

        <div className="flex w-[10%] flex-col gap-y-3">
          <p className="text-sm font-semibold uppercase ">Price</p>
          <GeneralDropdownContainer
            chosen={priceLabel}
            placeholder={priceLabel}
            showDropdown={showPriceDropdown}
            setShowDropdown={setShowPriceDropdown}
            width="w-full"
            customFn={(item) => {
              setShowPriceDropdown(false);
              searchParams.set("price", item.name);
              setSearchParams(searchParams);
            }}
            data={[
              { id: "free", name: "Free" },
              { id: "paid", name: "Paid" },
            ]}
          />
        </div>

        <button
          onClick={() => {
            searchParams.delete("name");
            searchParams.delete("price");
            searchParams.delete("category");
            searchParams.delete("level");
            searchParams.delete("language");
            searchParams.delete("sort");

            dispatch(removeAllStatuses());
            dispatch(setCategory(null));

            setSearchParams(searchParams);
            queryClient.invalidateQueries({
              queryKey: ["courses"],
              exact: false,
            });
          }}
          className="ms-auto mt-6 transform rounded-full bg-white px-5 py-3 font-semibold hover:scale-105"
        >
          <FontAwesomeIcon icon={faXmark} className="me-2" /> Clear Filters
        </button>
      </div>
    </>
  );
}

export default Filters;
