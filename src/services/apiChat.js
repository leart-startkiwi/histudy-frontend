import { axiosRequest } from "./baseApiRequest";

export async function getMessagesWithUser(userId) {
  try {
    const response = await axiosRequest("get", `chat/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllChats() {
  try {
    const response = await axiosRequest("get", `chat`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function markMessageAsRead(userId) {
  try {
    const response = await axiosRequest("put", `chat/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
