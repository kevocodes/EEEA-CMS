export const getDimentionsFromImageFile = (file: File) => {
  const dimensions = { width: 0, height: 0 };

  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    dimensions.width = img.width;
    dimensions.height = img.height;
  };

  return dimensions;
};
