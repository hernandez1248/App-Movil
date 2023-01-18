import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardRutas() {
    return (
        <Card style={{ width: '18rem' }} className="card-rutas">
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEvEarBlIA8qjB739U2HoyCy_-3Xtj80GAQA&usqp=CAU" />
            <Card.Body>
                <Card.Title className='text-center text-primary'>Xuchapa-Matamoros</Card.Title>
                <Card.Text>
                    Última combi: <span className='text-primary'> 02:00 pm</span><br></br>
                    Próxima combi: <span className='text-primary' > 02:30 pm</span><br></br>
                    N° de únidades: <span className='text-primary'> 08</span><br></br>
                    Salida en: <span className='text-primary'> 25 min</span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardRutas;