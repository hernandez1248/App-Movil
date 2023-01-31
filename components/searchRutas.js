import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaHome } from 'react-icons/fa';
import { BsFillStarFill } from "react-icons/bs"

function SearchRuta() {
    return (
        <>
            <div className="cardCronogramaInfo">
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search" />
                </Form>

                <div className='items-rutas'>
                    <FaHome className='home-icon'></FaHome>
                    <span className='items-font'>inicio</span>
                </div>
                
                <div className='items-rutas'>
                    <BsFillStarFill className='star-icon'></BsFillStarFill>
                    <span className='items-font'>Favoritos</span>
                </div>

            </div>
        </>

    );
}

export default SearchRuta;