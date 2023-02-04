import { PlusCircleFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from 'react-bootstrap/Modal';
import { render } from 'react-dom';

function AddButtonRutas(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <PlusCircleFill onClick={handleShow} className='addPlusFill'></PlusCircleFill>

            <Modal show={show}
                onHide={handleClose}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Agregar Ruta</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='card-rutauser-information '>

                        <div className='card-rutauser-izqu-modal'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '12.5ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                className='card-rutauser-izqu'
                            >
                                <TextField id="standard-basic" label="Origen" variant="standard" />
                            </Box>
                        </div>

                        <div className='card-rutauser-dere'>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" />
                            </Form.Group>
                        </div>

                    </div>

                    <div className='card-rutauser-information '>

                        <div className='card-rutauser-izqu-modal'>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '12.5ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                className='card-rutauser-izqu'
                            >
                                <TextField id="standard-basic" label="Destino" variant="standard" />
                            </Box>
                        </div>

                        <div className='card-rutauser-dere'>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" />
                            </Form.Group>
                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Agregar
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );

    function App() {
        const [modalShow, setModalShow] = React.useState(false);

        return (
            <>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Launch vertically centered modal
                </Button>

                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        );
    }

    render(<App />)
}

export default AddButtonRutas;