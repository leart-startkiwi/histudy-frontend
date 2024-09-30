import { axiosRequest } from "./baseApiRequest";

export async function createLastProgress(lastProgresSObj) {
  try {
    const response = await axiosRequest(
      "post",
      "last-progress",
      lastProgresSObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateLastProgress(lastProgressId, lastProgresSObj) {
  try {
    const response = await axiosRequest(
      "put",
      `last-progress/${lastProgressId}`,
      lastProgresSObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getLastProgress() {
  try {
    const response = await axiosRequest("get", `last-progress`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
