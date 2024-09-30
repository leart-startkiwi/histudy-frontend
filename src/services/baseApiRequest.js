import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getRefreshToken, refreshToken } from "./apiUsers";

const baseUrl = "http://localhost:8000/api";

export async function axiosRequest(method, url, data = null, params = null) {
  const formData = new FormData();
  if (data !== null && data.formData) {
    Object.keys(data.data).forEach((key) => {
      console.log(key, data.data[key]);
      formData.append(key, data.data[key]);
    });
  }

  try {
    const response = await axios({
      method,
      url: `${baseUrl}/${url}`,
      data: data?.data ? formData : data,
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // if (response.status === 403) {
    //   console.log("leart25");
    // }
    return response.data;
  } catch (error) {
    console.log(error);
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message === "Invalid Token"
    ) {
      const { id } = jwtDecode(localStorage.getItem("accessToken"));
      const refreshTokenData = await getRefreshToken(id);
      await refreshToken({ token: refreshTokenData.data.token });
    }
    throw new Error(error?.response?.data?.message);
  }
}
