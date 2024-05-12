import * as z from "zod";
import DropzoneContainer from "react-dropzone";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import InstallationCreateImageDropzoneContent from "./InstallationCreateImageDropzoneContent";
import { createInstallationSchema } from "@/schemas/installations.schema";

interface DropzoneProps {
  form: ReturnType<typeof useForm<z.infer<typeof createInstallationSchema>>>;
}

export default function InstallationCreateImageDropzone({
  form,
}: DropzoneProps) {
  return (
    <DropzoneContainer
      maxFiles={1}
      accept={{
        "image/png": [],
        "image/webp": [],
        "image/jpeg": [],
        "image/jpg": [],
      }}
      onDrop={(acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
          toast.error(
            "Solo se permiten imágenes en formato jpg, jpeg, png o webp"
          );
          return;
        }

        form.setValue("image", acceptedFiles);
        form.trigger("image");
      }}
      onFileDialogCancel={() => {
        form.setValue("image", []);
        form.trigger("image");
      }}
    >
      {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => (
        <div className="flex flex-col gap-2">
          {/* Error message */}
          {form.formState.errors.image ? (
            <p className="text-red-500 text-sm font-medium">
              {form.formState.errors.image.message}
            </p>
          ) : (
            <p className="text-sm font-medium leading-none">Imágen</p>
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
              <InstallationCreateImageDropzoneContent description="Suelta la imagen aquí" />
            ) : (
              // Else show the selected image preview and name
              <InstallationCreateImageDropzoneContent
                description={
                  acceptedFiles.length === 0
                    ? "Arrastra la imagen o haz clic aquí"
                    : acceptedFiles[0].name
                }
                image={acceptedFiles[0]}
              />
            )}
          </div>
        </div>
      )}
    </DropzoneContainer>
  );
}
