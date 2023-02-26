import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Container } from '@mui/system';
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useEffect } from 'react';

const CardUnidad = ({ unidad, onDelete, recargar }) => {
  const [routes, setRoutes] = useState([]);
  const [unidades, setData] = useState({ ...unidad });
  const [edit, setEdit] = useState(false);
  const [rutaSelected, setRuta] = useState('');

  const handleDelete = () => {
    onDelete(unidades.id);
  }

  const handleEdit = () => {
    setEdit(!edit);
  }

  const cancelSave = () => {
    setEdit(false);
  }

  const id = unidades.id;
  const { register, handleSubmit, watch, formState: { errors }, setError, setValue, resetField } = useForm();
  const onSubmit = (data) => {
    // Enviar la informacion al backend
    apiClient.put(`/unidades?id=${id}`, data)
      .then(response => {
        //console.log(response.data);
        if (recargar) {
          recargar(unidades.id);
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: response.data.message,
        })
        setEdit(false);
        resetField();
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.message)
        if (error.response.data.errors) {
          error.response.data.errors.forEach((errorItem) => {
            setError(errorItem.field, {
              //error: true,
              type: "validation",
              message: errorItem.error
            });
          })
        }
      })

  //devolver productos desde el back-end
  useEffect(() => {
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
  useEffect(() => {
    //ir por las routes desde el backend
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
    <Card elevation={10} style={{ width: '18rem', height: 'auto' }} className="card-unidad">
      <CardMedia sx={{ height: 140 }} image={"https://autoselrentacar.com/themes/default/images/t4.png"} title="Unidad" />
      {!edit && (
        <>
          <Typography className="card-unidad-chofer" variant="h5" component="div">
            {unidades.name}
          </Typography>

          <Typography variant="h5" component="div">
            {`Unidad ${unidades.numunidad}`}
          </Typography>

          <div className='card-unidad-information'>
            <Typography className='card-unidad-izqu'  >
              Ruta:
            </Typography>
            <Typography
              className='card-unidad-dere'

            >
              {`${unidades.ruta.origen}-${unidades.ruta.destino}`}
            </Typography>
          </div>

          <div className='card-unidad-information'>
            <Typography className='card-unidad-izqu'  >
              Placas:
            </Typography>
            <Typography
              className='card-unidad-dere'

            >
              {unidades.placas}
            </Typography>
          </div>

          <div className='card-unidad-information'>
            <Typography className='card-unidad-izqu'  >
              Teléfono:
            </Typography>
            <Typography className='card-unidad-dere'  >
              {unidades.phone}
            </Typography>
          </div>

          <div className='card-unidad-information'>
            <Typography className='card-unidad-izqu'  >
              Vigencia:
            </Typography>
            <Typography className='card-unidad-dere'  >
              {unidades.vigencialicencia}
            </Typography>
          </div>
        </>
      )}


      {edit && (
        <>
          <Container component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ padding: 2 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="ruta-id">Ruta</InputLabel>
                  <Select
                    id='ruta-id'
                    labelId="ruta-id-name"
                    defaultValue={unidades.rutaId}
                    onChange={(value) => rutaSelected(value)}
                    input={<OutlinedInput label="Ruta" />}
                    onSubmit={handleSubmit(onSubmit)}
                    error={!!errors.rutaId}
                    helperText={errors.rutaId?.message}
                    {...register('rutaId',
                      {
                        required: 'Este campo es obligatorio',
                      }
                    )
                    }
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

              <Grid item xs={12}>
                <TextField
                  id="name"
                  label="Nombre"
                  variant="standard"
                  defaultValue={unidades.name}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="numunidad"
                  label="Numero de unidad"
                  variant="standard"
                  defaultValue={unidades.numunidad}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="placas"
                  label="Placas"
                  variant="standard"
                  defaultValue={unidades.placas}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="phone"
                  label="Teléfono"
                  variant="standard"
                  defaultValue={unidades.phone}
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="vigencialicencia"
                  label="Vigencia de licencia"
                  variant="standard"
                  defaultValue={unidades.vigencialicencia}
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

              </Grid>
            </Grid>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button size="small" color="error" variant="contained" onClick={cancelSave}>Cancelar</Button>
              <Button size="small" color="primary" variant="contained" type="submit">Guardar</Button>
            </CardActions>
          </Container>
        </>
      )}
      {!edit && (
        <>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button size="small" color='error' variant='contained' onClick={handleDelete}>Eliminar</Button>
            <Button size="small" color='primary' variant='contained' onClick={handleEdit}>Editar</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}

export default CardUnidad;