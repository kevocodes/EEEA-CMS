import { ThumbnailImageProps } from "react-grid-gallery";
import InstallationActions from "./components/installationActions/InstallationActions";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function CustomInstallationImage({
  imageProps: { src, style },
  item: { key, caption },
}: ThumbnailImageProps) {
  return (
    <div className="relative group">
      <InstallationActions installationId={String(key)} />
      <img
        alt="Event image"
        src={src}
        style={style}
        key={key}
        className="pointer-events-none"
      />

      <Badge
        variant="secondary"
        className="hidden group-hover:block absolute bottom-2 right-2 ml-2"
      >
        {caption}
      </Badge>
    </div>
  );
}

export default CustomInstallationImage;

CustomInstallationImage.skeleton = function CustomInstallationImageSkeleton({
  imageProps: { style },
  item: { key },
}: ThumbnailImageProps) {
  return (
    <div key={key}>
      <Skeleton style={style} className="bg-muted" />
    </div>
  );
};
