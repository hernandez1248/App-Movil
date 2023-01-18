import Card from 'react-bootstrap/Card';
import { BsFillStarFill } from "react-icons/bs"
import { VscArrowSwap } from "react-icons/vsc"
function CardRutasUsuario() {
    return (
        <Card style={{ width: '18rem', backgroundColor: '#003C8F' }} className="card-ruta">
            <div className='card-rutas-image'>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEvEarBlIA8qjB739U2HoyCy_-3Xtj80GAQA&usqp=CAU" />
            </div>
            <Card.Body>
                <Card.Title className='text-center text-light'>Xuchapa-Matamoros</Card.Title>

                <div className='card-rutauser-information text-center'>
                    <div className='card-rutauser-izqu'>
                        <VscArrowSwap></VscArrowSwap>
                    </div>
                    <div className='card-rutauser-dere'>
                        <BsFillStarFill></BsFillStarFill>
                    </div>
                </div>

                <div className='card-rutauser-information'>
                    <div className='card-rutauser-izqu'>
                        <Card.Text>
                            Anterior salida:
                        </Card.Text>
                    </div>
                    <div className='card-rutauser-dere'>
                        <Card.Text>
                            02:00 pm
                        </Card.Text>
                    </div>
                </div>
                <div className='card-rutauser-information'>
                    <div className='card-rutauser-izqu'>
                        <Card.Text>
                            Próxima salida:
                        </Card.Text>
                    </div>
                    <div className='card-rutauser-dere'>
                        <Card.Text>
                            02:30 pm
                        </Card.Text>
                    </div>
                </div>
                <div className='card-rutauser-information'>
                    <div className='card-rutauser-izqu'>
                        <Card.Text>
                            Unidad:
                        </Card.Text>
                    </div>
                    <div className='card-rutauser-dere'>
                        <Card.Text>
                            10
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardRutasUsuario;