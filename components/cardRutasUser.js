import * as React from 'react';
import Card from 'react-bootstrap/Card';
import { BsFillStarFill } from "react-icons/bs"
import { VscArrowSwap } from "react-icons/vsc"

function CardRutasUsuario({index, ruta}) {
    const [data, setData] = React.useState({...ruta});

    console.log(ruta);

    return (
        <Card style={{ width: '18rem', backgroundColor: '#003C8F' }} className="card-ruta">
            <div className='card-rutas-image'>
            <Card.Img variant="top" src={data.imageDestino} />
            </div>
            <Card.Body>
                <Card.Title className='text-center text-light'>
                    {data.origen} - {data.destino}
                </Card.Title>

                <div className='card-rutauser-information text-center'>
                    <div className='card-rutauser-izqu'>
                        <VscArrowSwap></VscArrowSwap>
                    </div>
                    <div className='card-rutauser-dere'>
                        <BsFillStarFill/>
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
                           {data.salidaAnterior}
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
                            {data.horaSalida}
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
                            {data.unidad}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardRutasUsuario;