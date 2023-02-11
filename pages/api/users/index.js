import db from "@/database/models";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return addUsers(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }




  
  // Post: /users
  const addUsers = async (req, res) => {
    try{
        //los datos vienen en el req.body
        console.log(req.body);
        // guardar el usuario 
        const user = await db.User.create({...req.body});

        res.json({
            user,
            message: 'El usuario fue autentificado correctamente.'
        });
    } catch (error) {
        console.log(error);

        let errors = []
        if(error.errors){
            // extraer la informacion de los campos que tienen error
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }

        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }

// GET: /users
const userList = async (req, res) => {
}