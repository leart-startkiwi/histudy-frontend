import { axiosRequest } from "./baseApiRequest";

export async function updateCourseContent(contentId, updateCourseContentObj) {
  try {
    const response = await axiosRequest("put", `course-contents/${contentId}`, {
      data: updateCourseContentObj,
      formData: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCourseContent(contentBody) {
  try {
    const response = await axiosRequest("post", `course-contents`, contentBody);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCourseContent(contentId) {
  try {
    const response = await axiosRequest(
      "delete",
      `course-contents/${contentId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
