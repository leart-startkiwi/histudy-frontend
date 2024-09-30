export function useCategorySubmition({
  selectedFile,
  submitFunction,
  setClickedModal,
  image,
  categoryId,
  setRequestError,
}) {
  function onSubmit(data) {
    const categoryData = {
      image: selectedFile || image,
      name: data.name,
    };

    if (categoryId) {
      if (selectedFile === null) delete categoryData.image;
      submitFunction(
        {
          id: categoryId,
          updateCategoryObj: categoryData,
        },
        {
          onSuccess: () => {
            setClickedModal(false);
          },
          onError: (err) => {
            setRequestError(err.message);
          },
        },
      );
    } else {
      submitFunction(categoryData, {
        onSuccess: () => {
          setClickedModal(false);
        },
        onError: (err) => {
          setRequestError(err.message);
        },
      });
    }
  }

  return { onSubmit };
}
