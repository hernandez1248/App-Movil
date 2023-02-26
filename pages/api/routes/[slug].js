import db from "@/database/models";

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return showRoute(req, res);
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const showRoute = async (req, res) => {
    try {
        // leer la categoria
        const route = await db.Route.findOne({
            where: {id: req.query.slug }
        }); 

        if(!route) {
            return res.status(404).json({
                message: 'La ruta no existe',
            });
        }

        // buscar archivos de la ruta
        const gallery = await db.Document.findAll({
            where: {
                documentable: 'route',
                documentableId: req.query.slug,
            }
        })
    
      return res.json({ ...route.dataValues, gallery});
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }
