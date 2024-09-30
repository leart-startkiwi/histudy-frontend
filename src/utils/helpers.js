import {
  CURRENT_LECTURE,
  MY_QUESTIONS,
  NO_RESPONSE_QUESTIONS,
  RECENT_SORT,
  UPVOTED_SORT,
} from "../redux/questionsSlice";

export function timeAgo(createdDate) {
  const now = new Date();
  const diffInMs = now - new Date(createdDate);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) {
    return "today";
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

export function convertSecondsToMinutes(seconds) {
  // if (isNaN(seconds) || seconds < 0) {
  //   throw new Error("Invalid input: seconds must be a non-negative number");
  // }

  const totalMinutes = Math.ceil(seconds / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${minutes} min`;
}

export const buildQuestionsQueryObj = (
  filterType,
  sortFilter,
  filterQuestions,
  contentId,
) => {
  const queryObj = {};

  if (filterType === CURRENT_LECTURE) queryObj.content_id = contentId;

  if (sortFilter === UPVOTED_SORT) queryObj.sort_by_upvotes = "desc";
  if (sortFilter === RECENT_SORT) queryObj.sort_by_date = "desc";

  if (filterQuestions === MY_QUESTIONS) queryObj.my_questions = "true";
  if (filterQuestions === NO_RESPONSE_QUESTIONS) queryObj.no_replies = "true";

  return queryObj;
};

export function isTextEmpty(text) {
  let cleanedText = text.replace(/<\/?[^>]+(>|$)/g, "");
  cleanedText = cleanedText.replace(/&nbsp;|\s|\t|\n|\r/g, "");
  return cleanedText.length === 0;
}

export const inputStyle = `peer block w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500`;

export const labelStyle = `absolute hover:cursor-text start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`;
