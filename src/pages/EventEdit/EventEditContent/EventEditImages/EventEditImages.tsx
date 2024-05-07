import { Event, EventImage } from "@/models/events.model";
import { convertToPhotos } from "./utils/convert-to-slides";
import { Gallery } from "react-grid-gallery";
import CustomImage from "./components/CustomImage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DeleteAllImagesButton from "./components/DeleteAllImagesButton/DeleteAllImagesButton";

interface EventEditImagesProps {
  event: Event;
  images: EventImage[];
  removeImageFromUI: (imageId: string) => void;
  removeAllImagesFromEventUI: () => void;
}
function EventEditImages({
  event,
  images,
  removeImageFromUI,
  removeAllImagesFromEventUI,
}: EventEditImagesProps) {
  return (
    <div className="w-full flex flex-col gap-4 bg-background p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-sm text-muted-foreground text-center">
            {images.length} Imágenes
          </p>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row justify-center">
          {images.length > 0 && (
            <DeleteAllImagesButton
              event={event}
              removeAllImagesFromEventUI={removeAllImagesFromEventUI}
            />
          )}
          <Button className="w-full sm:w-fit">
            <Plus size={16} className="mr-2" />
            Agregar imágen
          </Button>
        </div>
      </div>
      <Gallery
        images={convertToPhotos(images)}
        enableImageSelection={false}
        thumbnailImageComponent={(props) => {
          return (
            <CustomImage {...props} removeImageFromUI={removeImageFromUI} />
          );
        }}
      />
    </div>
  );
}

export default EventEditImages;
