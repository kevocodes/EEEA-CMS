import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import ProfileEditContent from "./components/ProfileEditContent/ProfileEditContent";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";
import { PRIVATE_ROUTES } from "@/constants/routes";

function Profile() {
  useTitle(getTitles(PRIVATE_ROUTES.PROFILE));

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <h2 className="text-xl font-bold">Editar Perfil</h2>
      </div>

      <ProfileEditContent />
    </PageContainer>
  );
}

export default Profile;
