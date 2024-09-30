import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneralDropdownContainer from "../../../features/ManageCourse/GeneralDropdownContainer";
import {
  ALL_LECTURES,
  CURRENT_LECTURE,
  MY_QUESTIONS,
  NO_RESPONSE_QUESTIONS,
  RECENT_SORT,
  setFilterQuestions,
  setQuestionFilterType,
  setQuestionSortFilter,
  UPVOTED_SORT,
} from "../../../redux/questionsSlice";

function QuestionFilters() {
  const dispatch = useDispatch();
  const { filterType, sortFilter, filterQuestions } = useSelector(
    (store) => store.questions,
  );
  const [showFilterTypeDropdown, setShowFilterTypeDropdown] = useState(false);

  const [showSortFilterDropdown, setShowSortFilterDropdown] = useState(false);

  const [showFilterQuestionsDropdown, setShowFilterQuestionsDropdown] =
    useState(false);

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex flex-1 flex-col gap-y-3">
        <label className="font-semibold">Filters:</label>
        <GeneralDropdownContainer
          chosen={filterType}
          placeholder={filterType}
          showDropdown={showFilterTypeDropdown}
          setShowDropdown={setShowFilterTypeDropdown}
          width="w-full"
          customFn={(item) => {
            setShowFilterTypeDropdown(false);
            dispatch(setQuestionFilterType(item.name));
          }}
          data={[
            { id: 1, name: ALL_LECTURES },
            { id: 2, name: CURRENT_LECTURE },
          ]}
        />
      </div>
      <div className="flex flex-1 flex-col gap-y-3">
        <label className="font-semibold">Sort by:</label>
        <GeneralDropdownContainer
          chosen={sortFilter}
          placeholder={sortFilter}
          showDropdown={showSortFilterDropdown}
          setShowDropdown={setShowSortFilterDropdown}
          width="w-full"
          customFn={(item) => {
            setShowSortFilterDropdown(false);
            dispatch(setQuestionSortFilter(item.name));
          }}
          data={[
            { id: 1, name: UPVOTED_SORT },
            { id: 2, name: RECENT_SORT },
          ]}
        />
      </div>
      <div className="flex flex-1 flex-col gap-y-3">
        <label className="invisible font-semibold">Sort by:</label>
        <GeneralDropdownContainer
          chosen={filterQuestions}
          placeholder={filterQuestions}
          showDropdown={showFilterQuestionsDropdown}
          setShowDropdown={setShowFilterQuestionsDropdown}
          width="w-full"
          customFn={(item) => {
            setShowFilterQuestionsDropdown(false);
            if (item.name === filterQuestions) {
              dispatch(setFilterQuestions("Filter Questions"));
            } else {
              dispatch(setFilterQuestions(item.name));
            }
          }}
          data={[
            { id: 1, name: MY_QUESTIONS },
            { id: 2, name: NO_RESPONSE_QUESTIONS },
          ]}
        />
      </div>
    </div>
  );
}

export default QuestionFilters;
