import { File } from "lucide-react";

interface DropzoneContentProps {
  description?: string;
  image?: File;
}

export default function InstallationEditImageDropzoneContent({
  description,
  image,
}: DropzoneContentProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center text-muted-foreground">
      {
        image ? (
          <img src={URL.createObjectURL(image)} alt="thumbnail" className="w-32 h-32 object-contain rounded-lg" />
        ) : (
          <File size={48} />
        )
      }

      <p className="text-sm font-medium leading-none">{description}</p>
    </div>
  );
}
