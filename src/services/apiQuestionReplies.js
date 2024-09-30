import { axiosRequest } from "./baseApiRequest";

export async function getQuestionReplies(questionId) {
  try {
    const response = await axiosRequest(
      "get",
      `question-replies/${questionId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createQuestionReply(replyObj) {
  try {
    const response = await axiosRequest("post", `question-replies`, replyObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
