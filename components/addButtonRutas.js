import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import { useForm } from "react-hook-form";
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddButtonRutas({recargar}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm();
  const onSubmit = (data) => {
    //console.log(data);
    // Enviar la informacion al backend
    apiClient.post('/routes', data)
    .then((response) => {
      //console.log(response.data);
      //alert(response.data.message);
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: response.data.message,
      })
      setOpen(false);
      if(recargar){
        recargar();
      }
      reset();
    })
    .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>{"Agregar Ruta"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="origen" label="Origen" variant="outlined" fullWidth
                            error={!!errors.origen}
                            helperText={errors.origen?.message}
                            {...register('origen',
                                {
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                                        message: 'El nombre solo debe contener letras'
                                    }
                                }
                            )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="imageOrigen" label="URL de Imagen" variant="outlined" fullWidth
                            error={!!errors.imageOrigen}
                            helperText={errors.imageOrigen?.message}
                            {...register('imageOrigen',
                                {
                                    required: 'Este campo no puede quedar vacío',
                                }
                            )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="destino" label="Destino" variant="outlined" fullWidth
                            error={!!errors.destino}
                            helperText={errors.destino?.message}
                            {...register('destino',
                                {
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
                                        message: 'El destino solo debe contener letras'
                                    }
                                }
                            )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="imageDestino" label="URL de Imagen" variant="outlined" fullWidth
                            error={!!errors.imageDestino}
                            helperText={errors.imageDestino?.message}
                            {...register('imageDestino',
                                {
                                    required: 'Este campo no puede quedar vacío',
                                }
                            )
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='outlined' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' type="submit">Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}