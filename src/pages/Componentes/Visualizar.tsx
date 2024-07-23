import { obtenerMensajes, eliminarMensaje } from '@/Firebase/Promesas'
import { Mensaje } from '@/interfaces/IPersona'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { LuFolderEdit } from "react-icons/lu";
import { TbBrandAmongUs } from "react-icons/tb";


export const Visualizar = () => {
    const [mensajes, setMensajes] = useState<Mensaje[]>([])

    useEffect(() => {
        // obtiene el listado desde las promesas
        obtenerMensajes().then((mensajes) => {
            // Guarda el listado
            setMensajes(mensajes)
        }).catch((e) => {
            console.log(e)
            alert("Error")
        })
    }, [])
        // este muestra una alerta de pagina donde pregunta si lo quiere elim
    const handleEliminar = async (key: string) => {
        if (confirm("¿Está seguro de que desea eliminar este mensaje?")) {
            try {
                await eliminarMensaje(key);
                alert("Mensaje eliminado con éxito");
                // Actualiza el listado de mensajes despues de que se eliminan
                setMensajes((prevMensajes) => prevMensajes.filter((m) => m.key !== key));
            } catch (e) {
                console.error(e);
                alert("No se pudo eliminar el mensaje");
            }
        }
    }

    return (
        //trate de añadirle estilo a traves del globals y el home module pero no pude :(
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Nombre de Usuario</th>
                        <th>Género</th>
                        <th>Correo</th>
                        <th>Tema</th>
                        <th>Mensaje</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mensajes.map((m) => (
                            <tr key={m.key}>
                                <td>{m.Nombre}</td> 
                                <td>{m.Apellido}</td>
                                <td>{m.Telefono}</td>
                                <td>{m.Nombreus}</td>
                                <td>{m.genero}</td>
                                <td>{m.Correo}</td>
                                <td>{m.Tema}</td>
                                <td>{m.mensaje}</td>
                                <td>
                                    <Link href={{ pathname: '/Componentes/ACTmensaje', query: { key: m.key } }}>
                                        <Button variant='success'><LuFolderEdit />Modificar</Button>
                                    </Link>
                                    <Button 
                                        variant='danger' 
                                        onClick={() => {
                                            if (m.key) {
                                                handleEliminar(m.key);
                                            } else {
                                                alert("otro error mas :(");
                                            }
                                        }}
                                    >
                                        <TbBrandAmongUs />Eliminar
                                    </Button>
                                </td>         
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Visualizar
