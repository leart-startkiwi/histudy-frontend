import axios from "axios";
import { axiosRequest } from "./baseApiRequest";

export async function logout(userId) {
  try {
    const response = await axiosRequest("post", "users/logout", userId);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getRefreshToken(userId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/users/token/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function refreshToken(token) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/users/token",
      token,
    );
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login(userObj) {
  try {
    const response = await axiosRequest("post", "users/login", userObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signup(userObj) {
  try {
    const response = await axiosRequest("post", "users/signin", userObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
