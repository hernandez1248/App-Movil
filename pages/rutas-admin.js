import * as React from 'react';
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddButtonRutas from '@/components/addButtonRutas';
import Enlaces from '@/components/enlaces';
import Title from '@/components/titulo';
import { useState } from 'react';
import apiClient from '@/apiClient';
import CardRutas from '@/components/cardRutas';
import { Grid } from '@mui/material';
import Swal from 'sweetalert2';

export default function RutasAdmin() {
  const [route, setRoutes] = useState([]);

  React.useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    apiClient.get('/routes')
    .then(response =>{
      setRoutes(response.data || []);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const deleteRoute = (id) => {
    Swal.fire({
      title: '¿Estás Seguro de eliminar?',
      text: "Los datos relacionados con la ruta se perderan permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`/routes?id=${id}`)
        .then(response =>{
          console.log(response.data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            text: response.data.message,
          });
          refresh()
        })
        .catch(error => {
          console.log(error);
        })
      }
    })
  }


  const editRoute = (info, index) => {
    apiClient.put(`routes?id=${info.id}`, info)
      .then(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: response.data.message,
          confirmButtonText: "Aceptar"
        }).then((result) =>{
          if(result.isConfirmed){
            const routesCopy = [...route];
            routesCopy.splice(index, 1, info)
            setRoutes(routesCopy);
          }
        })
      })
      .catch(error =>{
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
  }

  const renderRoutes = () => {
    return route.map((routes, index) => (
     <Grid item xs={12} md={4} xl={2} key={routes.id}>
        <CardRutas
          index={index}
          route={routes}
          onDelete={deleteRoute}
          onEdit = {editRoute}  
        />
      </Grid>
    ))
  };

  return (
    <>
      <Head>
        <title>SIRTA</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>
      </Head>
      <main>
      <Navbar className="menu" fixed="top">
        <Container>
          <Navbar.Brand id="unidadesTitle">
            Rutas
          </Navbar.Brand>
          <Nav className="d-flex justify-content-end">
           <AddButtonRutas
            recargar={refresh}
            muestra = "hola"
           />
          </Nav>
        </Container>
      </Navbar>
      <Container className="formularioCrono">
        <Title></Title>
      </Container>  
      <Container>
        <Grid container spacing={2} sx={{p: 4}}>
          {renderRoutes()}
        </Grid>
      </Container>
      <Enlaces></Enlaces>
      </main>
      
    </>
  )
}
