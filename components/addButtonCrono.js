import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddButtonCrono({recargar}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [routes, setRutas] = useState([]);
  const [unidades, setUnits, setUnidades] = useState([]);
  const [rutaSelected, setRuta] = useState("");
  const [unitSelected, setUnit] = useState("");

  const {
    register, 
    handleSubmit, 
    formState:{errors},
    setError,
    setValue,
  } = useForm({

  });

  const formSubmit = (data) => {
    console.log(data);

    // Enviar la informacion al backend
    apiClient.post("/schedules", data)
      .then((response) => {
        //console.log(response.data);
        //alert(response.data.message);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: response.data.message,
          showConfirmButton: false,
          timer: 3000
        })
        setValue("routeId", null);
        setRuta("");
        setValue("unitId", null);
        setUnit("");
        setValue("hora", null);
        setOpen(false);
        
        if(recargar){
          recargar();
        }

      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);

        if (error.response.data.errors) {
          error.response.data.errors.forEach((errorItem) => {
            setError(errorItem.field, {
              type: "validation",
              message: errorItem.error,
            });
          });
        }
      });
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
    setRuta(e.target.value );
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
    setUnit(e.target.value );
  };
  return (
    <div>
    <AddCircleIcon onClick={handleClickOpen} fontSize="large" sx={{ color: "white" }}/>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        component={"form"} 
        onSubmit={handleSubmit(formSubmit)}
      >
        <DialogTitle variant="h5"  sx={{textAlign: "center", fontWeight: "bold"}}>{"Agregar horarios al cronograma"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} mt={2}>
                      <FormControl fullWidth >
                        <InputLabel id="ruta-id">Ruta</InputLabel>
                          <Select
                              id='ruta-id'
                              label="Ruta"
                              error={!!errors.routeId}
                              value={rutaSelected}
                              {...register('routeId',
                                {
                                    required: 'Este campo es obligatorio',
                                    onChange: onSelectRuta
                                })
                              }
                          >
                              {routes.map((item) => (
                                  <MenuItem key={`r-${item.id}`} value={item.id}>{item.id} {item.origen}-{item.destino}</MenuItem>
                              ))}
                          </Select>
                          {!!errors.routeId && (
                            <FormHelperText>{errors.routeId?.message || ""}</FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth >
                        <InputLabel id="unidad-id">Unidad</InputLabel>
                          <Select
                              id='unidad-id'
                              label="Unidad"
                              value={unitSelected}
                              error={!!errors.unitId}
                              {...register('unitId',
                                {
                                    required: 'Este campo es obligatorio',
                                    onChange: onSelectUnit,
                                })
                              }
                          >
                              {unidades.map((item) => (
                                  <MenuItem key={`u-${item.id}`} value={item.id}>{item.numunidad}</MenuItem>
                              ))}
                          </Select>
                          {!!errors.unitId && (
                          <FormHelperText>{errors.unitId?.message || ""}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Form.Control
                          type="time" 
                          placeholder="Ingrese la Hora de Salida"
                          error={!!errors.hora}
                          isInvalid={!!errors.hora}
                          helperText={errors.hora?.message}
                          {...register("hora", {
                            required: "Este campo es obligatorio",
                          })}
                          
                        />
                          {!!errors.hora && (
                            <FormHelperText>{errors.hora?.message || ""}</FormHelperText>
                          )}

                    </Grid>
                </Grid>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-around", marginBottom: 1}}>
          <Button color='error' variant='contained'className="BtnCancelarCrono" onClick={handleClose}>Cancelar</Button>
          <Button color='success' variant='contained' className="BtnCancelarCrono" type="submit">Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}