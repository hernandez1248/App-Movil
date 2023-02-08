import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import apiClient from '@/apiClient';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { Container, Grid, TextField, Button, Paper, Alert } from '@mui/material';
import Swal from 'sweetalert2';

export default function AddButtonUnidad() {
    const [unidad, setUnidades] = useState([]);

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
    const onSubmit = (data) => {
        console.log(data);

        //enviar datos al backend
        apiClient.post('/unidades', data)
            .then((response) => {
                //console.log(response);
                //alert(response.data.message);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer:3000
                })
                setOpen(false);
            })
            .catch((error) => {
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
            });
    };

    const [data, setData] = useState({ ...unidad });
    //Agrega elementos al array e inserta datos a la nueva tarjeta generada
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addCard = () => {
        const unidadCopy = [...unidad];
        unidadCopy.push(data);
        setUnidades(unidadCopy);
        //setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Vigencia de licencia" fullWidth variant="standard"
                                        id="vigencia licencia"
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
                                        onChange={handleChange}
                                    />
                                </Grid>

                            </Grid>

                            <DialogActions>
                                <Button color='error' variant='outlined' onClick={handleClose}>Cancelar</Button>

                                <Button type="submit" variant="contained" onClick={addCard}>Guardar</Button>
                            </DialogActions>
                        </Container>

                    </Paper>
                </DialogContent>

            </Dialog>
        </div>
    );
}