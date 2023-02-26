import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid, TextField } from '@mui/material';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardUsers({ index, user, onDelete, onSave }) {
  const [data] = React.useState({ ...user });
  const [edit, setEdit] = React.useState(false);


  const handleEdit = () => {
    setEdit(!edit);
  }

  const cancelSave = () => {
    setEdit(false);
  }

  const handleDelete = () => {
    onDelete(data.id)
  }

  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
  const onSubmit = (editInfo) => {
    editInfo.id = data.id
    onSave(editInfo, index);
    setEdit(false);
  };


  return (
    <>
      {!edit && (
        <Card sx={{ maxWidth: 345, marginBottom: 2 }} elevation={8} >
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                  {data.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6" color="text.error">
                  Correo:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" color="text.primary">
                  {data.email}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6" color="text.primary">
                  Contraseña:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" color="text.primary">
                  {data.password}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button size="small" variant='outlined' color="error" onClick={handleDelete}>Eliminar</Button>
            <Button size="small" variant='contained' onClick={handleEdit}>Editar</Button>
          </CardActions>
        </Card>
      )}
      {edit && (
        <Card sx={{ maxWidth: 345, marginBottom: 2 }} elevation={8} component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField fullWidth label='Nombre' id='name'
                  defaultValue={data.name}
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
                <TextField fullWidth label='Email' id='email'
                  defaultValue={data.email}
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
                <TextField fullWidth label='Contraseña'
                  defaultValue={data.password}
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
          </CardContent>
          <CardActions>
            <Button size="small" variant='outlined' color="error" onClick={cancelSave}>Cancelar</Button>
            <Button size="small" variant='contained' type='submit'>Guardar</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}