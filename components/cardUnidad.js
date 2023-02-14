import * as React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';




function CardUnidad({ unidad, onDelete, recargar }) {
  const [routes, setRoutes] = React.useState([]);
  //const [original, setOriginal] = React.useState(false);
  const [data, setData] = React.useState({ ...unidad });
  const [edit, setEdit] = React.useState(false);
  const [rutaSelected, setRuta] = React.useState('');

  /*handleOriginal = () => {
    setOriginal(!original);
  }*/

  const handleDelete = () => {
    onDelete(data.id);
  };

    //Editar datos de las tarjetas
    const handleEdit = () => {
      setEdit(!edit);
    };

  const cancelSave = () => {
    // resetear los datos
    //setData({ ...unidad });
    setEdit(false);
    recargar();
    
  }

  /*const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };*/

  const id = data.id;
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const onSubmit = (data) => {
    //console.log(data);

    //enviar datos al backend
    apiClient.put(`/unidades?id=${id}`, data)
        .then((response) => {
            //Recargar la pagina con las targetas actuales
            if (recargar) {
              recargar();
          }
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: response.data.message,
            })
            setEdit(false);
        })
        .catch((error) => {
            //alert(error.response.data.message)
            if (error.response.data.errors) {
                error.response.data.errors.forEach((errorItem) => {
                    setError(errorItem.field, {
                        //error: true,
                        type: "validation",
                        message: errorItem.error
                    });
                })
            }
        });

};

  //devolver productos desde el back-end
  React.useEffect(() => {
    //ir por las routes desde el backend
    apiClient.get('/routes')
      .then(response => {
        setRoutes(response.data || []);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);
  //devuelve los datos desde el backend
  /*useEffect(() => {
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
  }, [rutaSelected]);*/
  //seleccionador para buscar por categoria
  const onSelectRuta = (e) => {
    setRuta(e.target.value)
  }

  return (
    <>
      <Card style={{ width: '17rem', height: 'auto' }} className="card-unidad">

        <CardMedia sx={{ height: 140 }} image={"https://autoselrentacar.com/themes/default/images/t4.png"} title="Unidad" />


        <CardContent component={'form'}>
          <Grid container onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
              {!edit && (
                <>
                  <Typography className="card-unidad-chofer"  variant="h5" component="div">
                    {data.name}
                  </Typography>

                  <Typography  variant="h5" component="div">
                    {`Unidad ${data.numunidad}`}
                  </Typography>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu'  >
                      Ruta:
                    </Typography>
                    <Typography
                      className='card-unidad-dere'
                      
                    >
                      {`${data.rutaId} ${data.ruta.origen}-${data.ruta.destino}`}
                    </Typography>
                  </div>

                  <div className='card-unidad-information'>
                  <Typography className='card-unidad-izqu'  >
                      Placas:
                    </Typography>
                    <Typography
                      className='card-unidad-dere'
                      
                    >
                      {data.placas}
                    </Typography>
                  </div>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu'  >
                      Teléfono:
                    </Typography>
                    <Typography className='card-unidad-dere'  >
                      {data.phone}
                    </Typography>
                  </div>

                  <div className='card-unidad-information'>
                    <Typography className='card-unidad-izqu'  >
                      Vigencia:
                    </Typography>
                    <Typography className='card-unidad-dere'  >
                      {data.vigencialicencia}
                    </Typography>
                  </div>
                </>
              )}

              {edit && (
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="ruta-id">Ruta</InputLabel>
                    <Select
                      id='ruta-id'
                      labelId="ruta-id-name"
                      defaulValue={`${data.rutaId} ${data.ruta.origen}-${data.ruta.destino}`}
                      onChange={(value) => setRuta(value)}
                      input={<OutlinedInput label="Ruta" />}
                      onSubmit={handleSubmit(onSubmit)}
                      ref={register('rutaId')}
                    >
                      <MenuItem value={0}>Seleccionar</MenuItem>
                      {routes.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.id} {item.origen}-{item.destino}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {edit && (
                <TextField
                  id="name"
                  label="Nombre"
                  variant="standard"
                  defaultValue={data.name}
                  //onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register('name',
                    {
                      required: 'Este campo es obligatorio',
                      pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                        message: 'El campo solo debe contener texto.'
                      }
                    }
                  )
                  }
                />
              )}

              {edit && (
                <TextField
                  id="numunidad"
                  label="Numero de unidad"
                  variant="standard"
                  defaultValue={data.numunidad}
                  //onChange={handleChange}
                  error={!!errors.numunidad}
                  helperText={errors.numunidad?.message}
                  {...register('numunidad',
                    {
                      required: 'Este campo es obligatorio',
                      pattern: {
                        value: /^[0-9]+$/i,
                        message: 'No es un número válido.'
                      }
                    }
                  )
                  }
                />
              )}

              {edit && (
                <TextField
                  id="placas"
                  label="Placas"
                  variant="standard"
                  defaultValue={data.placas}
                  //onChange={handleChange}
                  error={!!errors.placas}
                  helperText={errors.placas?.message}
                  {...register('placas',
                    {
                      required: 'Este campo es obligatorio',
                      pattern: {
                        value: /^[A-Z]{3}[-][0-9]{3}/,
                        message: 'No es una placa válida.'
                      }
                    }
                  )
                  }
                />
              )}
            </Grid>
          </Grid>

          {edit && (
            <TextField
              id="phone"
              label="Teléfono"
              variant="standard"
              defaultValue={data.phone}
              error={!!errors.phone}
              helpertext={errors.phone?.message}
              {...register('phone',
                {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[0-9]{2}[0-9]{8}$/,
                    message: 'El campo solo debe contener numerós y 10 caracteres.'
                  }
                }
              )
              }
            />
          )}

          {edit && (
            <TextField
              id="vigencialicencia"
              label="Vigencia de licencia"
              variant="standard"
              defaultValue={data.vigencialicencia}
              //onChange={handleChange}
              error={!!errors.vigencialicencia}
              helperText={errors.vigencialicencia?.message}
              {...register('vigencialicencia',
                {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: 'No es un año válido.'
                  }
                }
              )
              }
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
              <Button size="small" sx={{ fontWeight: "600" }} onClick={onSubmit}>
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