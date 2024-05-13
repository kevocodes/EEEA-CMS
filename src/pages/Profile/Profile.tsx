import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import ProfileEditContent from "./components/ProfileEditContent/ProfileEditContent";

function Profile() {
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
