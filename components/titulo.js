import { getSession, useSession } from "next-auth/react";

function Title() {
  const {data: session} = useSession();
  //console.log(session.user.name);
  return (
    <div>
      <h1 className='text-center'>
        Hola {session?.user?.name}
      </h1>
      <p className='text-center'>Modifica tus rutas y crea el cronograma del transporte público</p>
    </div>
  );
}

export default Title;