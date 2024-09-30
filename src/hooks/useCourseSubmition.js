export function useCourseSubmition({
  selectedFile,
  submitFunction,
  setClickedModal,
  certificate,
  statusState,
  image,
  courseId,
}) {
  function onSubmit(data) {
    let finalCertificate;

    if (certificate === "Yes") {
      finalCertificate = true;
    } else {
      finalCertificate = false;
    }

    const courseData = {
      image: selectedFile || image,
      name: data.name,
      description: data.description,
      teacher: data.teacher,
      video_Link: data.video_Link,
      status: statusState,
      categoryId: data.categoryId,
      language: data.language,
      skillLevel: data.skillLevel,
      certificate: finalCertificate,
      price: data.price,
    };

    if (courseId) {
      submitFunction(
        {
          id: courseId,
          updateCourseObj: courseData,
        },
        {
          onSuccess: () => {
            setClickedModal(false);
          },
        },
      );
    } else {
      submitFunction(courseData, {
        onSuccess: () => {
          setClickedModal(false);
        },
      });
    }
  }

  return { onSubmit };
}
