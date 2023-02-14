/* import db from "database/models/"

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return addSchedules(req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });

    }
}

//POST: /customers
const addSchedules = async (req, res) => {
    try {
         //los datos vienen en el req.body
         //console.log(req.body);
         // guardar el cliente 
         const hora = await db.Schedules.create({...req.body});
 
         res.json({
             hora,
             message: 'La hora fue registrado correctamente.'
         });
    } catch (error) {
        console.log(error);

        let errors = []
        if(error.errors){
            // estraer la informacion de los campos que tienen error
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
      */   


  import db from "@/database/models" 

// responsable de detectar el tipo de request 
// e invocar la funcion adecuada 
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return schedulesList(req, res);
        case 'POST':
            return addSchedules(req, res);
        case 'DELETE':
            return deleteSchedules(req, res);

        /* case 'POST':
            return filterProducts(req, res); */
        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

  const schedulesList = async (req, res) => {
    try {
        const schedules = await db.Schedules.findAll({
            include: ['unit', 'route'],
        });
        
        return res.json(schedules);
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
}


  const addSchedules = async (req, res) => {
    try {
        //los datos que vienen en el req.body
        //console.log(req.body);

        //guardar los datos del cliente
        const schedule = await db.Schedules.create({ ...req.body });

        res.json({
            schedule,
            message: 'EL cronograma fue registrado correctamente.'
        });
    } catch (error) {
        console.log(error);

        let errors = [];

        if (error.errors) {
            //extraer la información de los campos que tienen error
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }


        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la información: ${error.message}`,
                errors,
            }
        )
    }
}

const deleteSchedules = async (req, res) => {
    try {
        //eliminar los datos de la unidad
        const { id } = req.query;
        await db.Schedules.destroy({
            where: {
                id: id
            }
        });

        res.json({
            message: 'El cronograma fue eliminada correctamente.'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            //extraer la información de los campos que tienen error
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la información: ${error.message}`,
                errors,
            }
        )
    }
}