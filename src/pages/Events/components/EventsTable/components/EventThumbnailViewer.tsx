import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

interface EventThumbnailViewerProps {
  thumbnail: string;
}

function EventThumbnailViewer({ thumbnail }: EventThumbnailViewerProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <img
        src={thumbnail}
        onClick={handleOpen}
        alt="Thumbnail"
        className="w-16 h-16 object-contain cursor-pointer"
      />

      <Lightbox
        styles={{ container: { background: "rgba(0, 0, 0, 0.7)" } }}
        open={open}
        close={handleClose}
        slides={[{ src: thumbnail }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}

export default EventThumbnailViewer;
