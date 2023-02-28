import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';

function CardRutasUsuario({ index, ruta }) {
    const [data, setData] = React.useState({ ...ruta });
    const router = useRouter()

    //console.log(ruta);

    return (
        <Card sx={{ maxWidth: 345 }} elevation={12} onClick={()=> router.push(`/rutas-usuario/${data.id}`)} >
            <CardMedia
                sx={{ height: 250 }}
                image={data.route.imageDestino}
                title={data.route.destino}
            />
            <CardContent >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center',fontWeight: 'bold' }}>
                            {data.route.origen} - {data.route.destino}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="div" >
                            Hora Salida: {data.hora}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h5" component="div" >
                            Unidad: {data.unit.numunidad}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CardRutasUsuario;