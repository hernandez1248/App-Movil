import db from "database/models/"

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return usuariosList(req, res);
        case 'POST':
            return addUsuarios(req, res);
        case 'PUT':
            return editUsuarios(req, res);
        case 'DELETE':
            return deleteUsuarios(req, res);

        default:
            res.status(400).json({ error: true, message: 'Petición errónea' });
    }
}


// GET: /usuarios
const usuariosList = async (req, res) => {
    try {
        const usuarios = await db.Usuarios.findAll({...req.body});   
        return res.json(usuarios);
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
  }

//POST: /unidades
const addUsuarios = async (req, res) => {
    try {
        //los datos que vienen en el req.body
        //console.log(req.body);

        //guardar los datos del cliente
        const usuarios = await db.Usuarios.create({ ...req.body });

        res.json({
            usuarios,
            message: 'El usuario fue registrado correctamente.'
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

// GET: /usuarios

/*const usuariosList = async (req, res) => {
    try {
        const unid = await db.Usuarios.findAll({});

        return res.json(unid);
    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrió un error al procesar la petición: ${error.message}`
            }
        )
    }
}*/

/*const usuariosList = async (req, res) => {

    try {

        //leer la ruta a mostrar
        const { rutaId } = req.query;

        //Leer los productos
        let usuarios = [];

        if (rutaId) {
            unidads = await db.Usuarios.findAll({
                where: {
                    rutaId,
                },
                include: ['ruta'],
            });
        } else {
            unidads = await db.Usuarios.findAll({
                include: ['ruta'],
            });
        }

        return res.json(unidads)

    } catch (error) {
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición ${error.message}`
            }
        )
    }
}*/

//PUT: /usuarios
const editUsuarios = async (req, res) => {
    try {
        //eliminar los datos del usuario
        const { id } = req.query;
        await db.Usuarios.update({ ...req.body },
            {
                where: {
                    id
                }
            }
        )

        //await db.Usuarios.save();
        res.json({
            message: 'El usuario fue actualizado correctamente.'
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

//DELETE: /usuarios
const deleteUsuarios = async (req, res) => {
    try {
        //eliminar los datos del usuario
        const { id } = req.query;
        await db.Usuarios.destroy({
            where: {
                id: id
            }
        });

        res.json({
            message: 'El usuario fue eliminado correctamente.'
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