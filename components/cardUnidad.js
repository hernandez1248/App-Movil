import { Container } from '@mui/material';
import * as React from 'react';
import Card from 'react-bootstrap/Card';



function CardUnidad({index, unidad}) {
  const [unids, setData] = React.useState({...unidad});
  
  return (
    <>
      <Card border="info" style={{ width: '20rem', height: 'auto'}} className="card-unidad">
        <div variant="top">
          <Card.Img src="https://autoselrentacar.com/themes/default/images/t4.png" />
        </div>
        <Card.Body>
          <Card.Title className="card-unidad-chofer">
            {unids.name}
          </Card.Title>

          <div className='card-unidad-information'>
            <div className='card-ruta-izqu'>
              <Card.Text>
                Unidad:
              </Card.Text>
            </div>
            <div className='card-ruta-dere'>
              <Card.Text>
                {unids.numunidad}
              </Card.Text>
            </div>
          </div>

          <div className='card-unidad-information'>
            <div className='card-ruta-izqu'>
              <Card.Text>
                Placas:
              </Card.Text>
            </div>
            <div className='card-ruta-dere'>
              <Card.Text>
                {unids.placas}
              </Card.Text>
            </div>
          </div>

          <div className='card-unidad-information'>
            <div className='card-ruta-izqu'>
              <Card.Text>
                Teléfono:
              </Card.Text>
            </div>
            <div className='card-ruta-dere'>
              <Card.Text>
                {unids.phone}
              </Card.Text>
            </div>
          </div>

          <div className='card-unidad-information'>
            <div className='card-ruta-izqu'>
              <Card.Text>
                Vigencia de licencia:
              </Card.Text>
            </div>
            <div className='card-ruta-dere'>
              <Card.Text>
                {unids.vigencialicencia}
              </Card.Text>
            </div>
          </div>

        </Card.Body>
      </Card>
    </>
  );
}

export default CardUnidad;