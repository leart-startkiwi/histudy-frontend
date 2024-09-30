import { axiosRequest } from "./baseApiRequest";

export async function createUserProgress(userProgressBody) {
  try {
    const response = await axiosRequest(
      "post",
      `user-progress`,
      userProgressBody,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserProgress(courseId) {
  try {
    const response = await axiosRequest("get", `user-progress/${courseId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUserProgress(contentId) {
  try {
    const response = await axiosRequest("delete", `user-progress/${contentId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
