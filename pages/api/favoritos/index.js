import db from "@/database/models";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return listaFavoritos(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const listaFavoritos = async (req, res) => {
    try{
        const favoritos = await db.Favoritos.findAll({});
        return res.json(favoritos);
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }