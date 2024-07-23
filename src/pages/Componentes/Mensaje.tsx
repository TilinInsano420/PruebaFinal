import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { RegistrarMensaje } from '@/Firebase/Promesas';

const EnviarMensaje = () => {
  // Estado para almacenar los datos
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Nombreus: '',
    genero: '',
    Correo: '',
    Tema: 'queja',
    mensaje: ''
  });
  //Muestra las alertas
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  // Maneja los cambios del formulario
  const handleCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, name, value, type } = e.target;

    if (type === 'radio') {
      setFormData({
        ...formData,
        genero: value
      });
    } else if (id) {
      setFormData({
        ...formData,
        [id]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
 // validan lo que es si los campos estan todos rellenos y si el telefono tiene 9 digitos
  const handleenv = async () => {
    if (Object.values(formData).some(value => value === '' || (value.length === 0 && value !== 'mensaje'))) {
      setAlert({ show: true, message: 'Todos los campos deben ser rellenados', variant: 'danger' });
      return;
    }

    if (formData.Telefono.length !== 9) {
      setAlert({ show: true, message: 'El número de teléfono debe tener 9 dígitos', variant: 'danger' });
      return;
    }
    //transforma el telefono a un int
    const dataToSend = {
      ...formData,
      Telefono: parseInt(formData.Telefono)
    };
    //muestra el mensaje de enviado si esta todo correcto y limpia el formulario
    try {
      await RegistrarMensaje(dataToSend);
      setAlert({ show: true, message: 'Mensaje enviado exitosamente', variant: 'success' });
      setFormData({
        Nombre: '',
        Apellido: '',
        Telefono: '',
        Nombreus: '',
        genero: '',
        Correo: '',
        Tema: 'queja',
        mensaje: ''
      });
    } catch (error) {
      setAlert({ show: true, message: 'Error al enviar el mensaje', variant: 'danger' });
    }
  };
 // diseño de la pagina con su estructura
  return (
    <div className="w">
      <h1>Mantente al tanto y deja un mensaje!</h1>
      <Form>
        <Form.Group controlId="Nombre">
          <Form.Label className="formLabel">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            className="formControl"
            value={formData.Nombre}
            onChange={handleCambio}
          />
        </Form.Group>

        <Form.Group controlId="Apellido">
          <Form.Label className="formLabel">Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido"
            className="formControl"
            value={formData.Apellido}
            onChange={handleCambio}
          />
        </Form.Group>

        <Form.Group controlId="Telefono">
          <Form.Label className="formLabel">Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 123456789"
            className="formControl"
            value={formData.Telefono}
            onChange={handleCambio}
          />
        </Form.Group>

        <Form.Group controlId="Nombreus">
          <Form.Label className="formLabel">Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Clash"
            className="formControl"
            value={formData.Nombreus}
            onChange={handleCambio}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="formLabel">Género</Form.Label>
          <div className="radioGroup">
            <Form.Check
              type="radio"
              id="Masculino"
              name="genero"
              value="Masculino"
              label="Masculino"
              checked={formData.genero === 'Masculino'}
              onChange={handleCambio}
              className="formLabel"
            />
            <Form.Check
              type="radio"
              id="Femenino"
              name="genero"
              value="Femenino"
              label="Femenino"
              checked={formData.genero === 'Femenino'}
              onChange={handleCambio}
              className="formLabel"
            />
            <Form.Check
              type="radio"
              id="Otro"
              name="genero"
              value="Otro"
              label="Prefiero no decirlo"
              checked={formData.genero === 'Otro'}
              onChange={handleCambio}
              className="formLabel"
            />
          </div>
        </Form.Group>

        <Form.Group controlId="Correo">
          <Form.Label className="formLabel">Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ejemplo@mail.com"
            className="formControl"
            value={formData.Correo}
            onChange={handleCambio}
          />
        </Form.Group>

        <Form.Group controlId="Tema">
          <Form.Label className="formLabel">Tema para el mensaje</Form.Label>
          <Form.Control
            as="select"
            className="formControl"
            value={formData.Tema}
            onChange={handleCambio}
          >
            <option value="queja">Queja</option>
            <option value="opinion">Opinión</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="mensaje">
          <Form.Label className="formLabel">Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Escribe tu mensaje aquí"
            className="formControl"
            value={formData.mensaje}
            onChange={handleCambio}
          />
        </Form.Group>

        <div className="buttonGroup">
          <Button type="button" onClick={handleenv} variant="success">Enviar</Button>
        </div>
        
        {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      </Form>
    </div>
  );
};

export default EnviarMensaje;
