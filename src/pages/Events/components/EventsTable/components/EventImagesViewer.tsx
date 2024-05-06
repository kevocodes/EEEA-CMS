import { Button } from "@/components/ui/button";
import { EventImage } from "@/models/events.model";
import { Images } from "lucide-react";
import { useState } from "react";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Lightbox from "yet-another-react-lightbox";

interface ImagesViewerProps {
  completed: boolean;
  images: EventImage[];
}

function ImagesViewer({ completed, images }: ImagesViewerProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        disabled={!completed || images.length === 0}
        className="h-8 w-8 p-0"
        onClick={handleOpen}
      >
        <Images className="h-6 w-6" />
      </Button>

      <Lightbox
        styles={{ container: { background: "rgba(0, 0, 0, 0.7)" } }}
        plugins={[Counter]}
        counter={{
          container: { style: { fontWeight: "bold", bottom: 0, top: "unset" } },
        }}
        open={open}
        close={handleClose}
        slides={images.map((image) => ({
          src: image.url,
        }))}
      />
    </>
  );
}

export default ImagesViewer;
