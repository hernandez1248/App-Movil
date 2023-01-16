import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormularioCronograma() {
  return (
    <Form>
      <Form.Group className='formGroup' controlId="formBasicEmail">
        <Form.Label className="formGroup-Component">Ruta: </Form.Label>
        <Form.Select className="formGroup-Component" aria-label="Default select example">
          <option>Elegir Destino</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </Form.Select>
      </Form.Group>
      <Form.Group  className='formGroup' controlId="formBasicPassword">
        <Form.Label className="formGroup-Component">Unidad: </Form.Label>
        <Form.Select className="formGroup-Component" aria-label="Default select example">
          <option>Elegir Unidad</option>
          <option value="1">One</option>
          <option value="2">Two</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='formGroup'>
      <Form.Control className='dateComponent' type="time" placeholder="Ingrese la Hora de Salida" />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button type="submit" className='boton-crono'>
        Agregar
      </Button>
      </div>
      
    </Form>
  );
}

export default FormularioCronograma;