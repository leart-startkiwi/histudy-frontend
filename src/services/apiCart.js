import { axiosRequest } from "./baseApiRequest";

export async function getCartItems() {
  try {
    const response = await axiosRequest("get", "cart");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addToCart(cartObj) {
  try {
    const response = await axiosRequest("post", "cart", cartObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function removeFromCart(cartId) {
  try {
    const response = await axiosRequest("delete", `cart/${cartId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
