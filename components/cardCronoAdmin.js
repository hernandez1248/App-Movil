import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';


function CardCronoAdmin({crono, onDelete, onSave }) {
  const [data, setData] = useState({ ...crono });
  const [edit, setEdit] = useState(false);
  const [routes, setRutas] = useState([]);
  const [unidades, setUnits, setUnidades] = useState([]);
  const [rutaSelected, setRuta] = useState("");
  const [unitSelected, setUnit] = useState("");

  console.log(data);

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
    <Card border="primary" className="cardCronograma cards">
      {!edit && (
        <>
          <Card.Header className="d-flex justify-content-center"><Card.Title className="cardCronogramaUnidad">Unidad {data.unitId}</Card.Title></Card.Header>
          <Card.Body>
            <div className="cardCronogramaInfo">
              <div className="cardCronogramaDatosIzq">
                <Card.Text>
                  Chofer:
                </Card.Text>
              </div>
              <div className="cardCronogramaDatosDer">
                <Card.Text>
                  {data.unit.name}
                </Card.Text>
              </div>
            </div>
            <div className="cardCronogramaInfo">
              <div className="cardCronogramaDatosIzq">
                <Card.Text>
                  Salida:
                </Card.Text>
              </div>
              <div className="cardCronogramaDatosDer">
                <Card.Text>
                  {data.hora}
                </Card.Text>
              </div>
            </div>
            <div className="cardCronogramaInfo">
              <div className="cardCronogramaDatosIzq">
                <Card.Text>
                  Ruta:
                </Card.Text>
              </div>
              <div className="cardCronogramaDatosDer">
                <Card.Text>
                  {data.route.origen} - {data.route.destino}
                </Card.Text>
              </div>
            </div>
          </Card.Body>
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
                  helperText={errors.routeId?.message}
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
                  helperText={errors.unitId?.message}
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

              <Form.Group className="formGroup">
                <Form.Control
                  className="dateComponent"
                  type="time"
                  placeholder="Ingrese la Hora de Salida"
                  defaultValue={data.hora}
                  error={!!errors.hora}
                  helperText={errors.hora?.message}
                  {...register("hora", {
                    required: "Este campo es obligatorio",
                  })}
                />
              </Form.Group>
            </Grid>
            <div className="cardCronogramaBotones" >
              <Button type="submit" variant="danger" className="BtnCancelarCrono" onClick={cancelSave}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" className="BtnCancelarCrono">
                Guardar
              </Button>
            </div>
          </Container>

        </>
      )}
      {!edit && (
        <>

          <div className="cardCronogramaBotones">
            <Button
              type="submit"
              variant="danger"
              className="BtnCancelarCrono"
              onClick={handleDelete}
            >
              Eliminar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="BtnCancelarCrono"
              onClick={handleEdit}
            >
              Editar
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default CardCronoAdmin;