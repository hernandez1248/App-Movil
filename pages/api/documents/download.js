import db from "@/database/models";
import fs from "fs";
import extToMimes from "@/database/config/extToMimes";

 export default function handler(req, res) {
    switch(req.method) {
      case 'GET':
        return downloadDocument(req, res);
  
      default:
        res.status(400).json({error: true, message: 'Petición errÃ³nea'});
    }
  }

const downloadDocument = async (req, res) => {
    try {
        const fileName = req.query.file;
        const serverFilesPath = "/Users/jesus/Downloads/Pruebas/";
        const filePath = `${serverFilesPath}${fileName}`;
        console.log(filePath);

        //si no existe el archivo, enviar un status 404
        if(!fs.existsSync(filePath)){
            res.setHeader("Content-Type", "text/html");
            res.write("<h1>El archivo no existe</h1>");
            return res.status(404);
        }

        // entregar el archivo
        const ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        res.setHeader("Content-Type", extToMimes[ext] || 'application/document');
        res.setHeader("content-disposition", "attachment; filename=" + fileName);

        const fileBuffer = fs.readFileSync(filePath);
        res.send(fileBuffer);

    } catch(error) {
        console.log(error);
        return res.status(400).json(
          {
            error: true,
            message: `Ocurrió un error al leer el archivo: ${error.message}`
          }
        )
    }
}