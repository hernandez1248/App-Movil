import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';
import db from "@/database/models";

export const config = {
  api: {
    bodyParser: false,
  }
};

export default function handler(req, res) {
  switch(req.method) {
    case 'POST':
      return uploadFile(req, res);

    default:
      res.status(400).json({error: true, message: 'Petición errónea'});
  }
}

const uploadFile = async (req, res) => {
  try {
    let documentData = {};

    /* Get files using formidable */
    const files = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      let files = [];
      form.on('file', function (field, file) {
        files.push([field, file]);
      });
      form.on('end', () => resolve(files));
      form.on('error', err => reject(err));
      form.parse(req, (err, Fields, Files) => {
        documentData = Fields;
      });
    }).catch(e => {
      return res.status(400).json({ 
        success: false,
        message: 'Ocurrió un error al guardar el documento.',
      });
    });

    const serverFilesPath = "/Users/jesus/Downloads/Pruebas";
    const filePath = "images"; // subcarpeta de donde se guardarÃ¡ el archivo
    const targetPath = path.join(serverFilesPath, filePath);  // destino final

    if (files.length) {
      /* comprobar que la carpeta de subir archivos existe, sino crearla */
      try {
        await fs.access(targetPath);
      } catch (e) {
        await fs.mkdir(targetPath, { recursive: true });
      }
    } else {
      return res.status(400).json({ 
        success: false,
        message: 'No se recibió archivo en el servidor.',
      });
    }

    // mover cada uno de los archivos recibidos
    for (const file of files) {
      const tempPath = file[1].filepath;
      const originalFilename = file[1].originalFilename;
      const extension = originalFilename.substring(originalFilename.lastIndexOf('.'));

       // define file name from timestamp
       const fileName = `${Date.now()}${extension}`;
       // ruta final del archivo destino
       const finalFilePath = path.join(filePath, fileName);
       const fullFilePath = path.join(targetPath, fileName);
       
       // mover el archivo de carpeta temporal a la carpeta correspondiente de destino
       await fs.rename(tempPath, fullFilePath);
 
       // guardar la información del archivo en la base de datos
       
       // file was moved and has valid data, save on document
       documentData.name = fileName;
       documentData.docType = fileName.substring(fileName.lastIndexOf('.') + 1); // don't include dot
       documentData.path = finalFilePath; //fullFilePath.replace(process.env.DOCS_PATH as string, '');
       
       const document = await db.Document.create(documentData);
       
    }

    return res.json({message: 'El archivo fue guardado correctamente'});
  } catch(error) {
    console.log(error);
    return res.status(400).json(
      {
        error: true,
        message: `Ocurrió un error al procesa la petición: ${error.message}`
      }
    )
  }
}