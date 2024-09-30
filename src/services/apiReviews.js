import { axiosRequest } from "./baseApiRequest";

export async function createReview(reviewObj) {
  try {
    const response = await axiosRequest("post", "reviews", reviewObj);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateReview(reviewId, updateReviewObj) {
  try {
    const response = await axiosRequest(
      "put",
      `reviews/${reviewId}`,
      updateReviewObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getOwnReview(courseId) {
  try {
    const response = await axiosRequest("get", `reviews/${courseId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMyReviews() {
  try {
    const response = await axiosRequest("get", `reviews`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteReview(reviewId) {
  try {
    const response = await axiosRequest("delete", `reviews/${reviewId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
