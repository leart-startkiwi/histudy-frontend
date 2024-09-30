import { axiosRequest } from "./baseApiRequest";

export async function getUpvotes() {
  try {
    const response = await axiosRequest("get", "upvotes");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function upvoteQuestion(upvoteObj) {
  try {
    const response = await axiosRequest("post", "upvotes", upvoteObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUpvoteQuestion(questionId) {
  try {
    const response = await axiosRequest("delete", `upvotes/${questionId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
