import { Button } from "@/components/ui/button"
import { PRIVATE_ROUTES } from "@/constants/routes"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

function CreateInstallationButton() {
  return (
    <Link to={PRIVATE_ROUTES.INSTALLATIONS_CREATE} className="w-full sm:w-fit">
    <Button className="w-full sm:w-fit">
      <Plus size={16} className="mr-2" />
      Crear instalación
    </Button>
  </Link>
  )
}

export default CreateInstallationButton