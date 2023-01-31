import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BackButton from '@/components/backButton';
import MenuCrono from '@/components/menuCrono';
import CardCronoUser from '@/components/cardCronoUser';

export default function CronogramaUser() {
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
        <Nav className="d-flex justify-content-end">
            <BackButton></BackButton>
          </Nav>
          <Navbar.Brand id="unidadesTitle">
            Xuchapa-Matamoros
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="formularioCrono">
        <MenuCrono></MenuCrono>
      </Container>  
      <Container className="tarjetasAcomodo">
        <CardCronoUser></CardCronoUser>
        <CardCronoUser></CardCronoUser>
        <CardCronoUser></CardCronoUser>
        <CardCronoUser></CardCronoUser>
      </Container>
      </main>
      
    </>
  )
}