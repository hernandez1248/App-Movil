import apiClient from '@/apiClient';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

function FormularioCronograma() {
  const [schedule, setSchedule] = useState([]);
  const [routes, setRutas] = useState([]);
  const [unidades, setUnits] = useState([]);
  const [rutaSelected, setRuta] = useState(null);
  const [unitSelected, setUnit] = useState(null);

  
  //guardar los datos del formulario
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const onSubmit = (data) => {
      // console.log(data);

      //enviar datos al backend
      apiClient.post('/schedules', data)
          .then((response) => {
            setSchedule([...schedule, { data }]);
              //console.log(response);
              //alert(response.data.message);
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  text: response.data.message,
                  showConfirmButton: false,
                  timer: 3000
              })

              //Recargar la pagina con las targetas actuales
              if (recargar) {
                  recargar();
              }
              //limpiar el formulario
              reset();

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
          setUnidades(response.data || []);
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
    <Container component={"form"} onSubmit={handleSubmit(onSubmit)}> 
      <Form>
        <Form.Group className="formGroup" controlId="formBasicEmail">
          <Form.Label className="formGroup-Component">Ruta: </Form.Label>
          <FormControl fullWidth >
            <InputLabel id="ruta-id">Ruta</InputLabel>
              <Select
                  id='ruta-id'
                  label="Ruta"
                  value={rutaSelected}
                  onChange={onSelectRuta}
              >
                  {routes.map((item) => (
                      <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem> //{item.origen}-{item.destino}
                  ))}
              </Select>
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
                    onChange={onSelectUnit}
                >
                    {unidades.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.numunidad}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Control
            className="dateComponent"
            type="time"
            placeholder="Ingrese la Hora de Salida"
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button type="submit" className="boton-crono">
            Agregar
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormularioCronograma;