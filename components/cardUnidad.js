import Card from 'react-bootstrap/Card';

function CardUnidad() {
  return (
    <>
      <Card border="info" style={{ width: '18rem' }} className="card-unidad">
        <div variant="top">
          <Card.Img  src="https://autoselrentacar.com/themes/default/images/t4.png" />          
        </div>
        <Card.Body>
          <Card.Title className="card-unidad-chofer">Juan Domínguez Rosas</Card.Title>
          <div className="card-unidad-info">
            <div className="card-unidad-info-unidad-placas">
              <Card.Text>Unidad</Card.Text>
              <Card.Text  className="card-unidad-chofer">8</Card.Text>
            </div>
            <div className="card-unidad-info-unidad-placas">
              <Card.Text>Placas</Card.Text>
              <Card.Text  className="card-unidad-chofer">128-YUO</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardUnidad;