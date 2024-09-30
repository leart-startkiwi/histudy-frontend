import { axiosRequest } from "./baseApiRequest";

export async function getLikedCourses() {
  try {
    const response = await axiosRequest("get", "likes");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function likeCourse(likeObj) {
  try {
    const response = await axiosRequest("post", "likes", likeObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function dislikeCourse(likeObj) {
  try {
    const response = await axiosRequest("delete", `likes`, likeObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
