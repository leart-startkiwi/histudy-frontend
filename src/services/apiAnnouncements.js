import { axiosRequest } from "./baseApiRequest";

export async function createAnnouncement(announcementObj) {
  try {
    const response = await axiosRequest(
      "post",
      "announcements",
      announcementObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createAnnouncementComment(announcementCommentObj) {
  try {
    const response = await axiosRequest(
      "post",
      "announcement-comments",
      announcementCommentObj,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAnnouncements(courseId) {
  try {
    const response = await axiosRequest("get", `announcements/${courseId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAnnouncementComments(announcementId) {
  try {
    const response = await axiosRequest(
      "get",
      `announcement-comments/${announcementId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteAnnouncementComment(commentId) {
  try {
    const response = await axiosRequest(
      "delete",
      `announcement-comments/${commentId}`,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateAnnouncementComment(commentId, commentBody) {
  try {
    const response = await axiosRequest(
      "put",
      `announcement-comments/${commentId}`,
      commentBody,
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
