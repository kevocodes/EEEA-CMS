import { convertToPhotos } from "./utils/convert-to-slides";
import { Gallery } from "react-grid-gallery";
import { Installation } from "@/models/installations.model";
import DeleteAllInstallationsButton from "./components/DeleteAllInstallationsButton/DeleteAllInstallationsButton";
import CustomInstallationImage from "./components/CustomImage/CustomInstallationImage";
import CreateInstallationButton from "./components/CreateInstallationButton";
import { Skeleton } from "@/components/ui/skeleton";
import { skeletonImages } from "./data/skeleton-images";

interface InstallationImagesProps {
  images: Installation[];
}
function InstallationImages({ images }: InstallationImagesProps) {
  return (
    <div className="w-full flex flex-col gap-4 bg-background p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-sm text-muted-foreground text-center">
            {images.length} Instalaciones
          </p>
        </div>

        <div className="flex gap-2 flex-col-reverse sm:flex-row justify-center">
          {images.length > 0 && <DeleteAllInstallationsButton />}
          <CreateInstallationButton />
        </div>
      </div>
      <Gallery
        images={convertToPhotos(images)}
        enableImageSelection={false}
        thumbnailImageComponent={(props) => {
          return <CustomInstallationImage {...props} />;
        }}
      />
    </div>
  );
}

export default InstallationImages;

InstallationImages.skeleton = function InstallationImagesSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4 bg-background p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Skeleton className="h-9 w-full bg-muted md:max-w-24" />

        <Skeleton className="h-9 w-full bg-muted md:max-w-44" />
      </div>
      <Gallery
        images={skeletonImages}
        enableImageSelection={false}
        thumbnailImageComponent={(props) => {
          return <CustomInstallationImage.skeleton {...props} />;
        }}
      />
    </div>
  );
};
