import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modal() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Ruta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning">Cancelar</Button>
          <Button variant="primary">Agregar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Modal;