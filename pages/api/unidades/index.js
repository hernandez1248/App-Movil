import db from "database/models/"

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return unidadesList(req, res);
        case 'POST':
            return addUnidades(req, res);
        case 'PUT':
            return EditUnidades(req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });

    }
}

//POST: /unidades
const addUnidades = async (req, res) => {
    try {
        //los datos que vienen en el req.body
        //console.log(req.body);

        //guardar los datos del cliente
        const unid = await db.Unidades.create({ ...req.body });

        res.json({
            unid,
            message: 'La unidad fue registrada correctamente.'
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

// GET: /unidades

const unidadesList = async (req, res) => {
    try {
        const unid = await db.Unidades.findAll({});

        return res.json(unid);
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
}

//PUT: /unidades
const EditUnidades = async (req, res) => {
    try {
        //los datos que vienen en el req.body
        console.log(req.body);

        //editar los datos del cliente
        //let unids = [];
        const unid = await db.Unidades.update({
            where: {
                id
            }
        });
        unid.set({
            ...req.body
        });

        res.json({
            unid,
            message: 'La unidad fue actualizada correctamente.'
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