import * as React from 'react';
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Enlaces from '@/components/enlaces';
import CardCronoAdmin from '@/components/cardCronoAdmin';
import AddButtonCrono from '@/components/addButtonCrono';
import { useState } from 'react';
import apiClient from '@/apiClient';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ButtonClose from '@/components/ButtonClose';


export default function CronogramaAdmin() {
  const [schedules, setCronograma] = useState([]);

  useEffect(() => {
    // ir por los productos desde el backend
    refresh();
  }, []);

  const refresh = () => {
    apiClient.get('/schedules')
      .then(response => {
        setCronograma(response.data || []);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteUnidad = (id) => {
    Swal.fire({
      title: '¿Estás Seguro de eliminar?',
      text: "Los datos relacionados con el horario se perderan permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`/schedules?id=${id}`)
          .then(response => {
            console.log(response.data);
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: response.data.message,
            })
            refresh()
          })
          .catch(error => {
            console.log(error);
          })
      }
    })

  }
  const renderCronograma = () => {
    return schedules.map((crono) => (
      <Grid item xs={12} lg={4} xl={2} mt={4} key={crono.id}>
        <CardCronoAdmin
          crono={crono}
          recargar={refresh}
          onDelete={deleteUnidad}
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
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
      </Head>
      <main>
        <Navbar className="menu" fixed="top">
          <Container>
            <Nav className="d-flex justify-content-end">
              <AddButtonCrono
                recargar={refresh}
              />
            </Nav>
            <Navbar.Brand id="unidadesTitle">
              Cronograma
            </Navbar.Brand>
            <Nav className="d-flex justify-content-end">
              <ButtonClose />
            </Nav>
          </Container>
        </Navbar>
        <Grid style={{ paddingLeft: "20px", paddingRight: "20px" }} container spacing={2} mt={4} mb={10}>
          {renderCronograma()}
        </Grid>
        <Enlaces></Enlaces>
      </main>

    </>
  )
}