import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function CardRutas({index, route}) {
    const [routes, setRoutes] = React.useState({...route});
    const [original, setOriginal] = React.useState(false);

    const handleOriginal = () => {
      setOriginal(!original);
    }

  return (
    <Card sx={{ maxWidth: 345 }} elevation={4} onClick={handleOriginal}>
      {!original && (
        <CardMedia
        sx={{ height: 250 }}
        image={routes.imageOrigen}
        title={routes.origen}
        />
      )}
      {original && (
        <CardMedia
        sx={{ height: 250 }}
        image={routes.imageDestino}
        title={routes.destino}
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
      <CardActions  sx={{display:'flex', justifyContent:'center'}}>
        <Button size="small" color='error' variant='outlined'>Eliminar</Button>
        <Button size="small" variant='contained'>Hacer Cambios</Button>
      </CardActions>
    </Card>
  );
}