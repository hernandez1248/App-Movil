import * as React from 'react';
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CardUnidad from '@/components/cardUnidad';
import Enlaces from '@/components/enlaces';
import AddButtonUnidad from '@/components/addButtonUnidad';
import { useState } from 'react';
import apiClient from '@/apiClient';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ButtonClose from '@/components/ButtonClose';

export default function UnidadesAdmin() {
  const [unidad, setUnidades] = useState([]);

  React.useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    apiClient.get('/unidades')
      .then(response => {
        setUnidades(response.data || []);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const deleteUnidad = (id) => {
    Swal.fire({
      title: '¿Estás Seguro de eliminar?',
      text: "Los datos relacionados con la unidad se perderan permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: 'si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`/unidades?id=${id}`)
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


  const renderUnidades = () => {
    return unidad.map((unid, index) => (
      <div key={unid.id}>
        <CardUnidad
          index={index}
          unidad={unid}
          recargar={refresh}
          onDelete={deleteUnidad}
        />
      </div>
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
              <AddButtonUnidad
                recargar={refresh}
              />
            </Nav>
            <Navbar.Brand id="unidadesTitle">
              Unidades
            </Navbar.Brand>
            <Nav className="d-flex justify-content-end">
              <ButtonClose />
            </Nav>
          </Container>
        </Navbar>

        <div style={{ marginTop: '100px', marginBottom: '60px' }}>
          <Container className='tarjetasAcomodo'>
            {renderUnidades()}
          </Container>
        </div>

        <Enlaces></Enlaces>
      </main>
    </>
  )
}