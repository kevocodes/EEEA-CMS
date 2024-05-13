import { InstallationDetail } from "@/models/installations.model";
import { ResponseError } from "@/models/responseError.model";
import { getInstallationById } from "@/services/installations.service";
import { urlToFile } from "@/utils/createImageFileFromUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InstallationEditInformationForm from "./components/InstallationEditForm/InstallationEditForm";

type InstallationEditParams = {
  installationId: string;
};

function InstallationEditContent() {
  const [loading, setLoading] = useState(true);
  const [installation, setInstallation] = useState<InstallationDetail | null>(
    null
  );
  const [image, setImage] = useState<File | null>(null);

  const { installationId } = useParams<InstallationEditParams>();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getInstallationById(installationId!);
        setImage(await urlToFile(response.url, "image.webp"));
        setInstallation(response);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [installationId]);

  return (
    <>
      {!loading && installation && image && (
        <InstallationEditInformationForm
          installation={installation}
          image={image}
        />
      )}

      {loading && <InstallationEditInformationForm.skeleton />}
    </>
  );
}

export default InstallationEditContent;
