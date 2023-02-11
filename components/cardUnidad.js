import * as React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";




function CardUnidad({ index, unidad, onDelete, onSave }) {
  //const [unidad,setUnidad] = React.useState([]);
  const [data, setData] = React.useState({ ...unidad });
  const [edit, setEdit] = React.useState(false);

  //Editar datos de las tarjetas
  const handleEdit = () => {
    setEdit(!edit);
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {

    // mandar a llamar a la funcion padre que guarda los datos que estan en el estado
    // onSave(data);
    if (onSave) {
      onSave(index, data);

    }
    setEdit(false);
  };

  const cancelSave = () => {
    // resetear los datos
    setData({ ...unidad });
    setEdit(false);
  }

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <>
      <Card style={{ width: '17rem', height: 'auto' }} className="card-unidad">

        <CardMedia sx={{ height: 140 }} image={"https://autoselrentacar.com/themes/default/images/t4.png"} title="Unidad" />


        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              {!edit && (
                <>
                  <Typography className="card-unidad-chofer" gutterBottom variant="h5" component="div">
                    {data.name}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    {`Unidad ${data.numunidad}`}
                  </Typography>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu' gutterBottom >
                      Ruta:
                    </Typography>
                    <Typography className='card-unidad-dere' gutterBottom >
                      {data.rutaId}
                    </Typography>
                  </div>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu' gutterBottom >
                      Placas:
                    </Typography>
                    <Typography className='card-unidad-dere' gutterBottom >
                      {data.placas}
                    </Typography>
                  </div>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu' gutterBottom >
                      Teléfono:
                    </Typography>
                    <Typography className='card-unidad-dere' gutterBottom >
                      {data.phone}
                    </Typography>
                  </div>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu' gutterBottom >
                      Vigencia:
                    </Typography>
                    <Typography className='card-unidad-dere' gutterBottom >
                      {data.vigencialicencia}
                    </Typography>
                  </div>
                </>
              )}

              {edit && (
                <TextField
                  name="ruta"
                  label="Ruta"
                  variant="standard"
                  value={data.rutaId}
                  onChange={handleChange}
                />
              )}

              {edit && (
                <TextField
                  name="name"
                  label="Nombre"
                  variant="standard"
                  value={data.name}
                  onChange={handleChange}
                />
              )}

              {edit && (
                <TextField
                  name="numunidad"
                  label="Numero de unidad"
                  variant="standard"
                  value={data.numunidad}
                  onChange={handleChange}
                />
              )}

              {edit && (
                <TextField
                  name="placas"
                  label="Placas"
                  variant="standard"
                  value={data.placas}
                  onChange={handleChange}
                />
              )}
            </Grid>
          </Grid>

          {edit && (
            <TextField
              name="phone"
              label="Teléfono"
              variant="standard"
              value={data.phone}
            />
          )}

          {edit && (
            <TextField
              name="vigencialicencia"
              label="Vigencia de licencia"
              variant="standard"
              value={data.vigencialicencia}
              onChange={handleChange}
            />
          )}
        </CardContent>

        <CardActions>
          {!edit && (
            <Button size="small" sx={{ fontWeight: "600" }} onClick={handleEdit}>
              Editar
            </Button>
          )}
          {edit && (
            <>
              <Button size="small" sx={{ fontWeight: "600" }} onClick={handleSave}>
                Guardar
              </Button>
              <Button size="small" color="error" sx={{ fontWeight: "600" }} onClick={cancelSave}>
                Cancelar
              </Button>
            </>
          )}
          <Button
            size="small"
            color="error"
            sx={{ fontWeight: "600" }}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default CardUnidad;