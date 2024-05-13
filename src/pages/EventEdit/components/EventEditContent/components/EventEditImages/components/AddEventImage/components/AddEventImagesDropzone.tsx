import * as z from "zod";
import DropzoneContainer from "react-dropzone";
import { toast } from "sonner";
import EventImageDropzoneContent from "./AddEventImagesDropzoneContent";
import { useForm } from "react-hook-form";
import {
  MAX_IMAGE_MB_SIZE,
  addEventImageSchema,
} from "@/schemas/events.schema";
import { cn } from "@/lib/utils";
import { sizeInBytes } from "@/utils/file-size-converter";

interface DropzoneProps {
  form: ReturnType<typeof useForm<z.infer<typeof addEventImageSchema>>>;
}

export default function AddEventImagesDropzone({ form }: DropzoneProps) {
  return (
    <DropzoneContainer
      maxSize={sizeInBytes(MAX_IMAGE_MB_SIZE)}
      accept={{
        "image/png": [],
        "image/webp": [],
        "image/jpeg": [],
        "image/jpg": [],
      }}
      onDrop={(acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
          toast.error(
            `Algunas imágenes no cumplen con el formato jpg, jpeg, png o webp, o el peso es mayor a ${MAX_IMAGE_MB_SIZE} MB, por lo que no se agregarán`
          );
        }

        form.setValue("images", acceptedFiles);
        form.trigger("images");
      }}
      onFileDialogCancel={() => {
        form.setValue("images", []);
        form.trigger("images");
      }}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        acceptedFiles,
        fileRejections,
      }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {/* Error message */}
            {form.formState.errors.images && (
              <p className="text-red-500 text-sm font-medium">
                {form.formState.errors.images.message}
              </p>
            )}

            <div
              {...getRootProps()}
              className={cn(
                "w-full rounded-lg bg-muted border-2 border-dashed border-gray-300 p-8 text-center focus:outline-none focus:ring-1 focus:ring-ring",
                isDragActive && "border-primary bg-primary/20",
                acceptedFiles.length > 0 && "border-primary bg-primary/20"
              )}
            >
              <input {...getInputProps()} />

              {/* While drag is active show a drop message */}
              {isDragActive ? (
                <EventImageDropzoneContent description="Suelta la imagen aquí" />
              ) : (
                // Else show the selected image preview and name
                <EventImageDropzoneContent
                  description={
                    acceptedFiles.length === 0
                      ? "Arrastra las imágenes o haz clic aquí"
                      : ""
                  }
                  acceptedFiles={acceptedFiles}
                />
              )}
            </div>
          </div>

          {fileRejections.length > 0 && (
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="text-sm font-medium leading-none text-destructive">
                Las siguientes imágenes no pueden ser agregadas:
              </p>
              {fileRejections.map((file) => (
                <p className="text-sm font-normal leading-none text-muted-foreground" key={crypto.randomUUID()}>
                  * {file.file.name}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </DropzoneContainer>
  );
}
