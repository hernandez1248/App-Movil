import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardRutas() {
    return (
        <Card style={{ width: '18rem' }} className="card-ruta">
            <div className='card-rutas-image'>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEvEarBlIA8qjB739U2HoyCy_-3Xtj80GAQA&usqp=CAU" />
            </div>
            <Card.Body>
                <Card.Title className='text-center text-primary'>Xuchapa-Matamoros</Card.Title>
                <div className='card-ruta-information'>
                    <div className='card-ruta-izqu'>
                        <Card.Text>
                            Última combi:
                        </Card.Text>
                    </div>
                    <div className='card-ruta-dere'>
                        <Card.Text>
                            02:00 pm
                        </Card.Text>
                    </div>
                </div>
                <div className='card-ruta-information'>
                    <div className='card-ruta-izqu'>
                        <Card.Text>
                            Próxima combi:
                        </Card.Text>
                    </div>
                    <div className='card-ruta-dere'>
                        <Card.Text>
                            02:30 pm
                        </Card.Text>
                    </div>
                </div>
                <div className='card-ruta-information'>
                    <div className='card-ruta-izqu'>
                        <Card.Text>
                            N° de unidad:
                        </Card.Text>
                    </div>
                    <div className='card-ruta-dere'>
                        <Card.Text>
                            08
                        </Card.Text>
                    </div>
                </div>
                <div className='card-ruta-information'>
                    <div className='card-ruta-izqu'>
                        <Card.Text>
                            Salida en:
                        </Card.Text>
                    </div>
                    <div className='card-ruta-dere'>
                        <Card.Text>
                            25 min
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardRutas;