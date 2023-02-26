import * as React from 'react';;
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { Card, Button, Container, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';

function CardCronoAdmin({ crono, onDelete, recargar }) {
  const [data, setData] = React.useState({ ...crono });
  const [edit, setEdit] = useState(false);
  const [routes, setRutas] = useState([]);
  const [unidades, setUnits, setUnidades] = useState([]);
  const [rutaSelected, setRuta] = useState('');
  const [unitSelected, setUnit] = useState('');


  const handleDelete = () => {
    onDelete(data.id);
  }

  const handleEdit = () => {
    setEdit(!edit);
  }     

  const cancelSave = () => {
    setEdit(false);
  }
  
  const id = data.id;
  const { register, handleSubmit, formState: { errors }, setError} = useForm();
  const onSubmit = (data) => {
    console.log(data);

    
    apiClient.put(`/schedules?id=${id}`, data)
      .then(response => {
        //console.log(response.data);
        if (recargar) {
          recargar(data.id);
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: response.data.message,
          showConfirmButton: false,
          timer: 3000
        })
        setEdit(false);
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
  };



  useEffect(() => {
    //ir por las routes desde el backend
    apiClient
      .get("/routes")
      .then((response) => {
        setRutas(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    //ir por las routes desde el backend
    apiClient
      .get("/unidades")
      .then((response) => {
        setUnits(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //devuelve los datos desde el backend
  useEffect(() => {
    //ir por las routes desde el backend
    if (rutaSelected) {
      apiClient.get(`/unidades?rutaId=${rutaSelected || null}`)
        .then((response) => {
          setUnits(response.data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [rutaSelected]);
  //seleccionador para buscar por categoria
  const onSelectRuta = (e) => {
    setRutas(e.target.value);
  };


  useEffect(() => {
    //ir por las routes desde el backend
    if (unitSelected) {
      apiClient.get(`/unidades?rutaId=${unitSelected || null}`)
        .then((response) => {
          setUnidades(response.data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [unitSelected]);
  //seleccionador para buscar por categoria
  const onSelectUnit = (e) => {
    setUnit(e.target.value);
  };

  const handleDelete = () => {
    onDelete(data.id);
  }

  const handleEdit = () => {
    setEdit(!edit);
  }

  const cancelSave = () => {
    setEdit(false);
  }

  const id = data.id;
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const onSubmit = (data) => {
    //console.log(data);

    apiClient.put(`/schedules?id=${id}`, data)
      .then(response => {
        //console.log(response.data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: response.data.message,
          showConfirmButton: false,
          timer: 3000
        })
        if(onSave){
          onSave()
        }
        setEdit(false);
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
  };



  useEffect(() => {
    //ir por las routes desde el backend
    apiClient
      .get("/routes")
      .then((response) => {
        setRutas(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    //ir por las routes desde el backend
    apiClient
      .get("/unidades")
      .then((response) => {
        setUnits(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //devuelve los datos desde el backend
  useEffect(() => {
    //ir por las routes desde el backend
    if (rutaSelected) {
      apiClient.get(`/unidades?rutaId=${rutaSelected || null}`)
        .then((response) => {
          setUnits(response.data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [rutaSelected]);
  //seleccionador para buscar por categoria
  const onSelectRuta = (e) => {
    setRuta(e.target.value);
  };


  useEffect(() => {
    //ir por las routes desde el backend
    if (unitSelected) {
      apiClient.get(`/unidades?rutaId=${unitSelected || null}`)
        .then((response) => {
          setUnidades(response.data || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [unitSelected]);
  //seleccionador para buscar por categoria
  const onSelectUnit = (e) => {
    setUnit(e.target.value);
  };
  return (
    <Card elevation={10} style={{ width: '100%', height: 'auto' }} className="cardCronograma cards">
      {!edit && (
        <>
            <Typography 
              gutterBottom 
              variant="h4" 
              textAlign="center" 
              mt={2} 
              fontWeight="bold"
              component="div">
              Unidad: {data.unitId}
            </Typography>
           
            <div className="cardCronogramaInfo">
              <div className="cardCronogramaDatosIzq">
                  Chofer:

              </div>
              <div className="cardCronogramaDatosDer">
                  {data.unit.name || ""}
              </div>
            </div>
            <div className="cardCronogramaInfo">
              <div className="cardCronogramaDatosIzq">
                  Salida:
              </div>
              <div className="cardCronogramaDatosDer">
                  {data.hora}
              </div>
            </div>
            <div className="cardCronogramaInfo">
              <div className="cardCronogramaDatosIzq">
                  Ruta:

              </div>
              <div className="cardCronogramaDatosDer">
                  {data.route.origen} - {data.route.destino}

              </div>
            </div>
            <div className="cardCronogramaBotones">
            <Button
              type="submit"
              color='error' 
              variant='contained'
              className="BtnCancelarCrono"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
            <Button
              type="submit"
              variant='contained'
              className="BtnCancelarCrono"
              onClick={handleEdit}
            >
              Editar
            </Button>
          </div>
        </>
      )}

      {edit && (
        <>
          <Container component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="ruta-id">Ruta</InputLabel>
                <Select
                  fullWidth
                  id='ruta-id'
                  label="Ruta"
                  defaultValue={data.routeId}
                  onChange={onSelectRuta}
                  error={!!errors.routeId}
                  {...register('routeId',
                    {
                      required: 'Este campo es obligatorio',
                    })
                  }
                >
                  {routes.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.id} {item.origen}-{item.destino}</MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <InputLabel id="unidad-id">Unidad</InputLabel>
                <Select
                  fullWidth
                  id='unidad-id'
                  label="Unidad"
                  defaultValue={data.unitId}
                  onChange={onSelectUnit}
                  error={!!errors.unitId}
                  {...register('unitId',
                    {
                      required: 'Este campo es obligatorio',
                    })
                  }
                >
                  {unidades.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.numunidad}</MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} >
                <InputLabel id="hora-id">Hora</InputLabel>
                <Form.Control
                  fullWidth
                  className="date"
                  type="time"
                  defaultValue={data.hora}
                  placeholder="Ingrese la Hora de Salida"
                  error={!!errors.hora}
                  helperText={errors.hora?.message}
                  {...register("hora", {
                    required: "Este campo es obligatorio",
                  })}
                />
                  {!!errors.unitId && (
                    <FormHelperText>{errors.unitId?.message || ""}</FormHelperText>
                  )}
              </Grid>
            </Grid>
            <div className="cardCronogramaBotones" >
              <Button 
                type="submit"  
                color='error' 
                variant='contained'
                className="BtnCancelarCrono"
                onClick={cancelSave}
              >
                Cancelar
              </Button>
              <Button t
                type="submit"
                color='success'  
                variant="contained" 
                className="BtnCancelarCrono"
              >
                Guardar
              </Button>
            </div>
          </Container>

        </>
      )}
    </Card>
  );
}

export default CardCronoAdmin;