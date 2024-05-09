import { File } from "lucide-react";

interface DropzoneContentProps {
  acceptedFiles?: File[];
  description?: string;
}

export default function AddEventImagesDropzoneContent({
  description,
  acceptedFiles,
}: DropzoneContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center text-muted-foreground">
      {/* <img
          src={URL.createObjectURL(image)}
          alt="thumbnail"
          className="w-32 h-32 object-contain rounded-lg"
        /> */}

      {acceptedFiles && (
        <div className="flex flex-col justify-center items-start gap-2">
          {acceptedFiles.map((file, index) => {
            // show the 3 first images filenames, then show a message with the remaining images
            if (index < 3) {
              return (
                <p
                  className="text-sm font-medium leading-none text-start"
                  key={crypto.randomUUID()}
                >
                  {file.name}
                </p>
              );
            }

            if (index === 3) {
              return (
                <p
                  key="remaining-images"
                  className="text-sm font-medium leading-none text-start"
                >
                  y {acceptedFiles.length - 3} imágenes más
                </p>
              );
            }
          })}
        </div>
      )}

      {description && (
        <>
          <File size={48} />
          <p className="text-sm font-medium leading-none">{description}</p>
        </>
      )}
    </div>
  );
}
