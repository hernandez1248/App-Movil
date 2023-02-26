import apiClient from '@/apiClient';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function FormularioCronograma({recargar}) {
  const [routes, setRutas] = useState([]);
  const [unidades, setUnits, setUnidades] = useState([]);
  const [rutaSelected, setRuta] = useState("");
  const [unitSelected, setUnit] = useState("");
  const [time, setTime] = React.useState(dayjs());

  const handleTime = (newValue) => {
    setTime(newValue);
  };

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
      <Form onSubmit={handleSubmit(formSubmit)}>
        <Form.Group className="formGroup" controlId="formBasicEmail">
          <Form.Label className="formGroup-Component">Ruta: </Form.Label>
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
        </Form.Group>
        <Form.Group className="formGroup" controlId="formBasicPassword">
          <Form.Label className="formGroup-Component">Unidad: </Form.Label>
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
        </Form.Group>
        <Form.Group className="formGroup" style={{marginLeft: 190, marginTop: 20}}>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                name="hora"
                label="Hora"
                value={time}
                type="time"
                onChange={handleTime}
                error={!!errors.hora}
                {...register("hora", {
                  required: "Este campo es obligatorio",
                })}
                renderInput={(params) => <TextField {...params} />}
              />
              {!!errors.hora && (
                  <FormHelperText>{errors.hora?.message || ""}</FormHelperText>
              )}
            </LocalizationProvider>
          </FormControl>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type="submit" className="boton">
            Agregar
          </Button>
        </div>
      </Form>
  );
}

export default FormularioCronograma;