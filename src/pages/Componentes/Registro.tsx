import { RegistrarUsuario } from '@/Firebase/Promesas';
import { Usuario } from '@/interfaces/IPersona';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const initialState: Usuario = {
  Usuario: "",
  Contraseña: ""
};

export const Registro = () => {
  const [usuario, setUsuario] = useState<Usuario>(initialState);
  const [confirmarContraseña, setConfirmarContraseña] = useState<string>("");
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleUsuario = (name: string, value: string) => {
    setUsuario({ ...usuario, [name]: value });
  };
  //valida todo lo que es el registro de usuario que se rellene todos los campos y que el confirmar contra 
  const validarreg = () => {
    if (!usuario.Usuario || !usuario.Contraseña || !confirmarContraseña) {
      setMensaje("Rellene todos los campos");
      return false;
    }
    if (usuario.Contraseña !== confirmarContraseña) {
      setMensaje("Las contraseñas no coinciden");
      return false;
    }
    setMensaje(null);
    return true;
  };
  //este es para enviar el usuario a la bd y cuando esta registrado muestra el mensaje
  const registrar = () => {
    if (!validarreg()) return;

    RegistrarUsuario(usuario).then(() => {
      setMensaje("Registro exitoso");
    }).catch((e) => {
      console.log(e);
      setMensaje("Error, Problemas con las promesas");
    });
  };
// diseño de la pagina y estructura
  return (
    <div>
      <div className="w">
        <Form>
          {mensaje && (
            <Alert variant={mensaje === "Registro exitoso" ? "success" : "danger"}>
              {mensaje}
            </Alert>
          )}

          <Form.Group>
            <Form.Label className="formLabel">Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder='Ingrese su Nombre de Usuario'
              name='Usuario'
              className="formControl"
              onChange={(e) => handleUsuario(e.currentTarget.name, e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="formLabel">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder='Ingrese su Contraseña'
              name='Contraseña'
              className="formControl"
              onChange={(e) => handleUsuario(e.currentTarget.name, e.currentTarget.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="formLabel">Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder='Confirme su Contraseña'
              value={confirmarContraseña}
              className="formControl"
              onChange={(e) => setConfirmarContraseña(e.currentTarget.value)}
            />
          </Form.Group>

          <Button type='button' variant='success' onClick={registrar} className="btngod">Registrar</Button>
        </Form>
      </div>
    </div>
  );
};

export default Registro;
