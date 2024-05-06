import { EventImage } from "@/models/events.model";

export const convertToPhotos = (images: EventImage[]) => {
  return images.map((image) => {
    return {
      key: image.id,
      src: image.url,
      width: image.width,
      height: image.height,
    };
  });
};
