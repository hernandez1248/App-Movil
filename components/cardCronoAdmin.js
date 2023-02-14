import * as React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function CardCronoAdmin({index, crono, onDelete, onEdit, route}) {
  const [data, setData] = React.useState({ ...crono });
  console.log(data);
  

  return (
    <>
      <Card border="primary" className="cardCronograma cards">
        <Card.Header className="d-flex justify-content-center"><Card.Title className="cardCronogramaUnidad">Unidad {data.unitId}</Card.Title></Card.Header>
        <Card.Body>
          <div className="cardCronogramaInfo">
            <div className="cardCronogramaDatosIzq">
              <Card.Text>
                Chofer: 
              </Card.Text>
            </div>
            <div className="cardCronogramaDatosDer">
              <Card.Text>
                {data.unit.name}
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
                {data.hora}
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
                {data.route.origen} - {data.route.destino}
              </Card.Text>
            </div>
          </div>
          <div className="cardCronogramaBotones">
            <Button type="submit" variant="primary" className="BtnCancelarCrono">
              Editar
            </Button>
            <Button type="submit" variant="danger" className="BtnCancelarCrono">
              Eliminar
          </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardCronoAdmin;