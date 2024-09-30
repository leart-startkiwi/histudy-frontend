import { axiosRequest } from "./baseApiRequest";

export async function getAssignedCourses() {
  try {
    const response = await axiosRequest("get", "assigned-courses");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
