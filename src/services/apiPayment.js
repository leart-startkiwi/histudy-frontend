import { axiosRequest } from "./baseApiRequest";

export async function createPaymentSession(body) {
  try {
    const response = await axiosRequest(
      "post",
      `cart/create-checkout-session`,
      body,
    );
    return response;
  } catch (error) {
    console.log("leart4", error);
    throw new Error(error.message);
  }
}
