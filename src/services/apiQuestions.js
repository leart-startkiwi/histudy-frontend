import { axiosRequest } from "./baseApiRequest";

export async function createQuestion(questionObj) {
  try {
    const response = await axiosRequest("post", `questions`, questionObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getQuestions(courseId, params) {
  try {
    const response = await axiosRequest(
      "get",
      `questions/${courseId}`,
      null,
      params,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
