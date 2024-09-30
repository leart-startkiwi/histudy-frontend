import { axiosRequest } from "./baseApiRequest";

export async function getReplyUpvotes() {
  try {
    const response = await axiosRequest("get", "reply-upvotes");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function upvoteReply(upvoteObj) {
  try {
    const response = await axiosRequest("post", "reply-upvotes", upvoteObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteReplyUpvote(replyId) {
  try {
    const response = await axiosRequest("delete", `reply-upvotes/${replyId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
