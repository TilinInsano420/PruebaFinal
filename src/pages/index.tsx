import { IniciarSesion } from '@/Firebase/Promesas';
import { Usuario } from '@/interfaces/IPersona';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

const initialState: Usuario = {
    Usuario: "",
    Contraseña: ""
};

export default function Home() {
    const [usuario, setUsuario] = useState<Usuario>(initialState);
    const [error, setError] = useState<string | null>(null);
    //el router se uso para cuando se iniciara sesion mandara al menu con las opciones
    const router = useRouter();

    const handleUsuario = (name: string, value: string) => {
        setUsuario({ ...usuario, [name]: value });
    };
// valida lo que es si el usuario rellena los campos o no
    const validar = () => {
        if (!usuario.Usuario || !usuario.Contraseña) {
            setError("Rellene todos los campos");
            return false;
        }
        setError(null);
        return true;
    };
// Verifica si hay un usuario con los datos que se ponen y tira un error con un mensaje si no lo encuentra
    const iniciarSesion = () => {
        if (!validar()) return;

        IniciarSesion(usuario).then(() => {
            alert("Inicio de sesión exitoso");
            router.push("./Componentes/menu");
        }).catch((e) => {
            console.log(e);
            setError("Error al iniciar sesión. Contraseña o nombre de usuario incorrectos");
        });
    };
//Esto es lo que se ve dentro cuando ya se abre la pagina, lo que es validaciones entre otras cosas
    return (
        <div>
            <div className="w">
            {error && <Alert variant="danger">{error}</Alert>}
                <Form>
                    <Form.Group>
                        <Form.Label className="formLabel">Nombre de usuario</Form.Label>
                        <Form.Control type="text" placeholder='Nombre de usuario' name='Usuario' className="formControl" onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="formLabel">Contraseña</Form.Label>
                        <Form.Control type="password" placeholder='Contraseña' name='Contraseña' className="formControl" onChange={(e) => { handleUsuario(e.currentTarget.name, e.currentTarget.value) }}/>
                    </Form.Group>
                    <Button type='button' variant='success' onClick={iniciarSesion} >Iniciar Sesión</Button>
                </Form>
            </div>
        </div>
    );
}
