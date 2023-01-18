import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function CardCronoAdmin() {
  return (
    <>
      <Card border="primary" className="cardCronograma cards">
        <Card.Header className="d-flex justify-content-center"><Card.Title className="cardCronogramaUnidad">UNIDAD 1</Card.Title></Card.Header>
        <Card.Body>
          <div className="cardCronogramaInfo">
            <div className="cardCronogramaDatosIzq">
              <Card.Text>
                Chofer: 
              </Card.Text>
            </div>
            <div className="cardCronogramaDatosDer">
              <Card.Text>
                Juan Domínguez Rosas
              </Card.Text>
            </div>
          </div>
          <div className="cardCronogramaInfo">
            <div className="cardCronogramaDatosIzq">
              <Card.Text>
                Salida: 
              </Card.Text>
            </div>
            <div className="cardCronogramaDatosDer">
              <Card.Text>
                06:00 A.M
              </Card.Text>
            </div>
          </div>
          <div className="cardCronogramaInfo">
            <div className="cardCronogramaDatosIzq">
              <Card.Text>
                Ruta: 
              </Card.Text>
            </div>
            <div className="cardCronogramaDatosDer">
              <Card.Text>
                Xuchapa - Matamoros
              </Card.Text>
            </div>
          </div>
          <div className="cardCronogramaBotones">
          <Button type="submit" variant="danger" className="BtnCancelarCrono">
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Hacer Cambios
          </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardCronoAdmin;