import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import apiClient from '@/apiClient';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Container, Grid, TextField, Button, Paper, FormControl, InputLabel, MenuItem, Input, OutlinedInput } from '@mui/material';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';

const AddButtonUnidad = ({ recargar }) => {
    const [unidad, setUnidades] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [rutaSelected, setRuta] = useState('0');

    //Abrir modal para mostrar el formulario
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //guardar los datos del formulario
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
    const onSubmit = (data) => {
        //console.log(data);

        //enviar datos al backend
        apiClient.post('/unidades', data)
            .then((response) => {
                setUnidades([...unidad, { data }]);
                //console.log(response);
                //alert(response.data.message);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: response.data.message,
                    showConfirmButton: true,
                    timer: 3000
                })
                setOpen(false);

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
            });

    };

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
    /*const onSelectRuta = (e) =>{
        setRuta(e.target.value)
    }*/

    const onSelectRuta = (e) => {
        setRuta({ [e.target.name]: e.target.value })
    }

    return (
        <div>
            <PlusCircleFill onClick={handleClickOpen} className='addPlusFill'></PlusCircleFill>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar unidad</DialogTitle>
                <DialogContent>
                    <Paper>
                        <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} sx={{ marginBottom: 4 }}>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Número de la unidad" fullWidth variant="standard"
                                        id="numunidad"
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Placas" fullWidth variant="standard"
                                        id="placas"
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Nombre del chofer" fullWidth variant="standard"
                                        id="name"
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Teléfono" fullWidth variant="standard"
                                        id="phone"
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
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

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Vigencia de licencia" fullWidth variant="standard"
                                        id="vigencialicencia"
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

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="rutaId">Ruta</InputLabel>
                                        <Select
                                            id='ruta-id'
                                            label="Ruta"
                                            defaultValue={rutaSelected}
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
                                            {routes.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>{`${item.id} ${item.origen}-${item.destino}`}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <DialogActions>
                                <Button color='error' variant='outlined' onClick={handleClose}>Cancelar</Button>

                                <Button type="submit" variant="contained" >Guardar</Button>
                            </DialogActions>
                        </Container>

                    </Paper>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default AddButtonUnidad;