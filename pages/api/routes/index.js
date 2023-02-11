//Detecta el reqyesr e invoca la función.

import db from "database/models/"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return routesList(req, res);
    case 'POST':
      return addRoute(req, res);
    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const routesList = async (req, res) => {
  try {
      const route = await db.Route.findAll({});   
      return res.json(route);
  } catch (error) {
      return res.status(400).json(
          {
              error: true,
              message: `Ocurrió un error al procesar la petición: ${error.message}`
          }
      )
  }
}



const addRoute = async (req, res) => {
  try {
    console.log(req.body);
    //leer los productos
    const route = await db.Route.create({...req.body});
    res.json({
      route,
      message: "La Ruta fue agregada con éxito"
    });
  }catch (error){
    console.log(error);
    let errors = [];
    //si catch tiene mensajes de error
    if(error.errors){
      //extraer la información de los campos con error
      errors = error.errors.map((item) => ({
        error: item.message,
        field: item.path,
      }));
    }
    return res.status(400).json(
      {
        error:true,
        message: `Ocurrió un error al procesar la petición: ${error.message}`,
        errors
      }
    )
  }
}