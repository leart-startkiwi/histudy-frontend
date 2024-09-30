import { axiosRequest } from "./baseApiRequest";

export async function updateCourseSection(sectionId, updateCourseSectionObj) {
  try {
    const response = await axiosRequest(
      "put",
      `course-sections/${sectionId}`,
      updateCourseSectionObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCourseSection(sectionId) {
  try {
    const response = await axiosRequest(
      "delete",
      `course-sections/${sectionId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCourseSection(sectionObj) {
  try {
    const response = await axiosRequest("post", `course-sections`, sectionObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
