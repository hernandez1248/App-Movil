import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function CardCronoUser(index, schedule, onDelete, onEdit, route) {
    const [data, setData] = React.useState({ ...schedule });
    return (
        <>
            <Card border="primary" className="cardCronograma cards">
                <Card.Header className="d-flex justify-content-center"><Card.Title className="cardCronogramaUnidad">UNIDAD 1</Card.Title></Card.Header>
                <Card.Body>
                    <div className="cardCronogramaInfo">
                        <div className="cardCronogramaDatosIzq">
                            <Card.Text>
                                Hora:
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
                                Placas:
                            </Card.Text>
                        </div>
                        <div className="cardCronogramaDatosDer">
                            <Card.Text>
                                UTI-300
                            </Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardCronoUser;