import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react"
import { Button } from "@mui/material"
import Swal from 'sweetalert2';

function ButtonClose() {

  const logout = () => {
    Swal.fire({
      title: '¿Estás Seguro de Cerrar Sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Si, estoy seguro',
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({callbackUrl: 'http://localhost:3000/login'}) 
      }
    })
  }
  return (
    <>
      <Button onClick={logout}>
        <LogoutIcon className="footer-icons"  style={{ color: "white" }}/>
      </Button>
    </>
  );
}
export default ButtonClose;