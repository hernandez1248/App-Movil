import * as React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import apiClient from '@/apiClient';
import { useEffect } from 'react';
import { useState } from 'react';




function CardUnidad({ index, unidad, onDelete, onEdit, route }) {
  //const [unidad,setUnidad] = React.useState([]);
  const [routes, setRoutes] = useState([])
  const [data, setData] = React.useState({ ...unidad });
  const [edit, setEdit] = React.useState(false);
  const [rutaSelected, setRuta] = React.useState(null);

  //Editar datos de las tarjetas
  const handleEdit = () => {
    setEdit(!edit);
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setRoutes({ ...routes, [e.target.name]: e.target.value });
  };

  const handleSave = () => {

    // mandar a llamar a la funcion padre que guarda los datos que estan en el estado
    // onEdit(data);
    if (onEdit) {
      onEdit(index, data);

    }
    setEdit(false);
  };

  const cancelSave = () => {
    // resetear los datos
    setData({ ...unidad });
    setEdit(false);
  }

  const handleDelete = () => {
    onDelete(data.id);
  };

  //devolver productos desde el back-end
  useEffect(() => {
    //ir por las routes desde el backend
    /*apiClient.get('/routes')
      .then(response => {
        setRoutes(response.data || []);
        //console.log(response);
      })
      .catch(error => {
        console.log(error);
      });*/
    recibirDato();
  }, []);

  const recibirDato = () => {
    apiClient.get('/routes')
      .then(response => {
        setRoutes(response.data || []);
        //console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  //devuelve los datos desde el backend
  useEffect(() => {
    //ir por los productos desde el backend
    if (rutaSelected) {
      apiClient.get(`/unidades?rutaId=${rutaSelected || null}`)
        .then(response => {
          setUnidades(response.data || []);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [rutaSelected]);
  //seleccionador para buscar por categoria
  const onSelectRuta = (e) => {
    setRuta(e.target.value)
  }

  return (
    <>
      <Card style={{ width: '18rem', height: 'auto' }} className="card-unidad">

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
                    <Typography
                      className='card-unidad-dere'
                      gutterBottom
                    >
                      {`${data.rutaId} ${data.ruta.origen}-${data.ruta.destino}`}
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
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth >
                    <InputLabel id="ruta-id">Ruta</InputLabel>
                    <Select
                      id='ruta-id'
                      label="Ruta"
                      value={rutaSelected}
                      onChange={onSelectRuta}
                    //onSubmit={handleSubmit(onSubmit)}
                    >
                      <MenuItem value={0}>Seleccionar</MenuItem>
                      {routes.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{`${item.id} ${item.origen}-${item.destino}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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