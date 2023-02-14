//Detecta el reqyesr e invoca la función.

import db from "database/models/"

export default function handler(req, res) {
  switch(req.method){
    case 'GET':
      return routesList(req, res);
    case 'POST':
      return addRoute(req, res);
    case 'DELETE':
      return deleteRoute(req, res);
    case 'PUT': 
      return updateRoute(req, res);
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

const deleteRoute = async(req, res) =>{
  try {
    const {id} = req.query;
    await db.Route.destroy({
      where: {
        id: id
      }
    });
    res.json({
      message: "La Ruta fue eliminada correctamente"
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

const updateRoute = async(req, res) => {
  try {
    const {id} = req.query;
    await db.Route.update({...req.body}, {
      where: {
        id:id
      }
    })
    res.json({
      message: "La Ruta fue Actualizada con éxito"
    });
  } catch (error) {
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

/*const updateRoute = async(req, res) =>{
  try {
    const {id} = req.query;
    const {origen, imageOrigen, destino, imageDestino} = req.body;
    console.log(id);
    console.log(req.body);
    const route = await db.Route.findByPk(id);
    route.origen = origen;
    route.imageOrigen = imageOrigen;
    route.destino = destino;
    route.imageDestino = imageDestino;
    await route.save();
    res.json({
      route,
      message: "La Ruta fue actualizada correctamente"
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
}*/