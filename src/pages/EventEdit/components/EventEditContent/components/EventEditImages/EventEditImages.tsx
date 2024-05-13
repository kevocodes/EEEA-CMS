import { Event, EventImage } from "@/models/events.model";
import { convertToPhotos } from "./utils/convert-to-slides";
import { Gallery } from "react-grid-gallery";
import CustomImage from "./components/CustomImage";
import DeleteAllImagesButton from "./components/DeleteAllImagesButton/DeleteAllImagesButton";
import AddEventImage from "./components/AddEventImage/AddEventImage";

interface EventEditImagesProps {
  event: Event;
  images: EventImage[];
  refetch: () => void;
}
function EventEditImages({
  event,
  images,
  refetch,
}: EventEditImagesProps) {
  return (
    <div className="w-full flex flex-col gap-4 bg-background p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-sm text-muted-foreground text-center">
            {images.length} Imágenes
          </p>
        </div>

        <div className="flex gap-2 flex-col-reverse sm:flex-row justify-center">
          {images.length > 0 && (
            <DeleteAllImagesButton
              event={event}
              refetch={refetch}
            />
          )}
          <AddEventImage event={event} refetch={refetch}/>
        </div>
      </div>
      <Gallery
        images={convertToPhotos(images)}
        enableImageSelection={false}
        thumbnailImageComponent={(props) => {
          return (
            <CustomImage {...props} refetch={refetch} />
          );
        }}
      />
    </div>
  );
}

export default EventEditImages;
