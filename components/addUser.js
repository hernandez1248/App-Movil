import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Grid, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUser({recargar}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    apiClient.post('usuarios', data)
    .then((response) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: response.data.message,
      })
      setOpen(false);
      recargar()
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
  }

  return (
    <div>
      <Button variant="contained" color='success' onClick={handleClickOpen} sx={{position:'fixed', bottom:120, right:0, marginRight:2, marginBottom:2, borderRadius: 10, height:65}}>
        <PersonAddIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>{"Agregar Usuario"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="name" variant="outlined" fullWidth placeholder="Nombre"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register('name',
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
                <TextField id="email" fullWidth placeholder='Email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email',
                    {
                      required: 'El Email es Obligatorio',
                      pattern: {
                        value: /(.+)@(.+){2,}\.(.+){3,}/i,
                        message: 'No es un email Válido'
                      }
                    }
                  )
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField id="password" fullWidth placeholder='Contraseña'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register('password',
                    {
                      required: 'Este campo es obligatorio',
                      minLength: 8,
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                        message: 'La contraseña debe tener mínimo 8 cáracteres, Una letra Mayúscula, Una minúscula, Al menos un dígito y Al menos un caracter especial'
                      }
                    }
                  )
                  }
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose} variant='outlined' color='error'>Cancelar</Button>
          <Button type='submit' variant='contained' color='success'>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}