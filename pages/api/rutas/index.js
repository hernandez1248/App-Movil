import db from "@/database/models";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return listaRutas(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const listaRutas = async (req, res) => {
    try {
        // leer la categoria
        const { favoritoId } = req.query;

        // leer los productos 
        let rutas = [];
        if (favoritoId) {
            rutas = await db.Rutas.findAll({
                where: {
                    favoritoId,
                },
                include: ['favs']
            });
        }else {
            rutas = await db.Rutas.findAll({
                include: ['favs']
            });
        }
        return res.json(rutas);
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }




  