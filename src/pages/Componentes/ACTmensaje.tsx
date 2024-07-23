import { actualizarMensaje, obtenerMensaje } from '@/Firebase/Promesas'
import { Mensaje } from '@/interfaces/IPersona'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'

const initialState: Mensaje = {
    Nombre: "",
    Apellido: "",
    Telefono: 0,
    Nombreus: "",
    genero: "",
    Correo: "",
    Tema: "",
    mensaje: "",
    key: ""
}

export const ACTmensaje = () => {
  const router = useRouter()
  const [mensaje, setMensaje] = useState<Mensaje>(initialState)
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' })

  const handleMensaje = (name: string, value: string | number) => {
      setMensaje({ ...mensaje, [name]: value })
  }

  useEffect(() => {
    const key = router.query.key;
    if (key !== undefined && typeof key === "string") {
        obtenerMensaje(key).then((m) => {
            if (m !== undefined) {
                setMensaje(m)
            } else {
                router.push('/Visualizar'); // Redirige si no existe el mensaje
            }
        })
    } else {
        router.push('/Visualizar'); // Redirige si la key no existe
    }
  }, [router.query.key, router])

  const modificar = async () => {
    try {
      await actualizarMensaje(mensaje);
      setAlert({ show: true, message: 'Mensaje actualizado con éxito', variant: 'success' });
    } catch (error) {
      setAlert({ show: true, message: 'Error al act', variant: 'danger' });
    }
  }

  return (
    <>
        <Form className='w'>
            <Form.Group>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type='text' placeholder='Ingrese su nombre: '
                    value={mensaje.Nombre}
                    name="Nombre"
                    onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }} />
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido:</Form.Label>
                <Form.Control type='text' placeholder='Ingrese su apellido: '
                    value={mensaje.Apellido}
                    name="Apellido"
                    onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }} />
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control type='number' placeholder='Ingrese su teléfono: '
                    value={mensaje.Telefono}
                    name="Telefono"
                    onChange={(e) => { handleMensaje(e.currentTarget.name, parseInt(e.currentTarget.value)) }} />
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Nombre de Usuario:</Form.Label>
                <Form.Control type='text' placeholder='Ingrese su nombre de usuario: '
                    value={mensaje.Nombreus}
                    name="Nombreus"
                    onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }} />
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Género:</Form.Label>
                <div>
                    <Form.Check
                        type="radio"
                        label="Masculino"
                        name="genero"
                        value="Masculino"
                        checked={mensaje.genero === "Masculino"}
                        onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }}
                    />
                    <Form.Check
                        type="radio"
                        label="Femenino"
                        name="genero"
                        value="Femenino"
                        checked={mensaje.genero === "Femenino"}
                        onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }}
                    />
                    <Form.Check
                        type="radio"
                        label="Prefiero no decirlo"
                        name="genero"
                        value="Prefiero no decirlo"
                        checked={mensaje.genero === "Prefiero no decirlo"}
                        onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }}
                    />
                </div>
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Correo:</Form.Label>
                <Form.Control type='email' placeholder='Ingrese su correo: '
                    value={mensaje.Correo}
                    name="Correo"
                    onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }} />
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Tema:</Form.Label>
                <Form.Control as='select' value={mensaje.Tema} name="Tema" onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }}>
                    <option value="queja">Queja</option>
                    <option value="opinion">Opinión</option>
                </Form.Control>
                <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Mensaje:</Form.Label>
                <Form.Control as='textarea' placeholder='Ingrese su mensaje: '
                    value={mensaje.mensaje}
                    name="mensaje"
                    onChange={(e) => { handleMensaje(e.currentTarget.name, e.currentTarget.value) }} />
                <Form.Text></Form.Text>
            </Form.Group>
            <Button type="button" variant='success' onClick={modificar}>Modificar</Button>
            {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
        </Form>
    </>
  )
}

export default ACTmensaje
