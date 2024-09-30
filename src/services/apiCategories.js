import { axiosRequest } from "./baseApiRequest";

export async function getCategories() {
  try {
    const response = await axiosRequest("get", "categories");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteCategory(categoryId) {
  try {
    const response = await axiosRequest("delete", `categories/${categoryId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCategory(createCategoryObj) {
  try {
    const response = await axiosRequest(
      "post",
      "categories",
      createCategoryObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateCategory(categoryId, updateCategoryObj) {
  try {
    const response = await axiosRequest(
      "put",
      `categories/${categoryId}`,
      updateCategoryObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
