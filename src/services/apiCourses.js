import { axiosRequest } from "./baseApiRequest";

export async function getCourses(params) {
  try {
    const response = await axiosRequest("get", "courses", null, params);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPopularCourses() {
  try {
    const response = await axiosRequest("get", "courses/popular");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCourse(courseId) {
  try {
    const response = await axiosRequest("get", `courses/${courseId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getInstructorCourses() {
  try {
    const response = await axiosRequest("get", "courses/instructor");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCourse(createCourseObj) {
  const formData = new FormData();

  Object.keys(createCourseObj).forEach((key) => {
    formData.append(key, createCourseObj[key]);
  });

  try {
    const response = await axiosRequest("post", "courses", formData);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCourse(courseId, updateCourseObj) {
  try {
    const response = await axiosRequest("put", `courses/${courseId}`, {
      data: updateCourseObj,
      formData: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await axiosRequest("delete", `Course/${courseId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
