import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Container } from '@mui/system';

export default function CardRutas({route, onDelete, onEdit, index}) {
    const [routes] = React.useState({...route});
    const [original, setOriginal] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
  
    const handleOriginal = () => {
      setOriginal(!original);
    }

    const handleDelete = () => {
      onDelete(routes.id);
    }

    const handleEdit = () => {
      setEdit(!edit);
    }
  
    const cancelSave = () =>{
      setEdit(false);
    }

    const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
    const onSubmit = (data) => {
      data.id = routes.id;
      onEdit(data, index);      
      setEdit(false);
    };
 
  return (
    <Card sx={{ maxWidth: 345 }} elevation={8}>
      {edit && (
        <>
           <Container component={"form"} onSubmit={handleSubmit(onSubmit)} sx={{padding:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="origen" label="Origen" variant="outlined" fullWidth
                            defaultValue={routes.origen}
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
                          defaultValue={routes.imageOrigen}                            
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
                            defaultValue={routes.destino}
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
                            defaultValue={routes.imageDestino}
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
            
            <CardActions  sx={{display:'flex', justifyContent:'space-around'}}>
              <Button size="small" color="error" variant={"outlined"} onClick={cancelSave}>Cancelar</Button>
              <Button size="small" color="success" variant="contained" type="submit">Guardar</Button>
          </CardActions>
          </Container>
        </>
      )}
      {!edit &&(
        <>
          {!original && (
            <CardMedia
            sx={{ height: 250 }}
            image={routes.imageOrigen}
            title={routes.origen}
            onClick={handleOriginal}
            />
          )}
          {original && (
            <CardMedia
            sx={{ height: 250 }}
            image={routes.imageDestino}
            title={routes.destino}
            onClick={handleOriginal}
            />
          )}
          <CardContent sx={{display:'flex', justifyContent:'center'}}>
            {!original && (
              <Typography gutterBottom variant="h5" component="div" >
              {routes.origen} - {routes.destino}
              </Typography>
            )}
            {original &&(
              <Typography gutterBottom variant="h5" component="div" >
              {routes.destino} - {routes.origen}
              </Typography>
            )}
          </CardContent>
          <CardActions  sx={{display:'flex', justifyContent:'space-around'}}>
            <Button size="small" color='error' variant='outlined' onClick={handleDelete}>Eliminar</Button>
            <Button size="small" color='primary' variant='contained' onClick={handleEdit}>Editar</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}