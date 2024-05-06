import { EventImage } from "@/models/events.model";
import { convertToPhotos } from "./utils/convert-to-slides";
import { Gallery } from "react-grid-gallery";
import CustomImage from "./components/CustomImage";

interface EventEditImagesProps {
  images: EventImage[];
  removeImageFromUI: (imageId: string) => void;
}
function EventEditImages({ images, removeImageFromUI }: EventEditImagesProps) {
  return (
    <div className="w-full">
      <Gallery
        images={convertToPhotos(images)}
        enableImageSelection={false}
        thumbnailImageComponent={(props) => {
          return <CustomImage {...props} removeImageFromUI={removeImageFromUI} />;
        }}
      />
    </div>
  );
}

export default EventEditImages;
