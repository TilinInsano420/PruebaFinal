import {addDoc,collection, getDoc, getDocs, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { db } from "./Firebase";
import { Usuario } from "@/interfaces/IPersona";
import { Mensaje } from "@/interfaces/IPersona";





export const RegistrarUsuario = async(usuario:Usuario)=>{

    const docRef = await addDoc(collection(db,"Usuarios"),usuario)
}

export const obtenerUsuario = async()=>{
    let Usuarios:Usuario[] = []

    const querySnapshot = await getDocs (collection(db,"Usuarios"));
    querySnapshot.forEach((doc)=>{
        let usuario:Usuario = {
            Usuario:doc.data().Usuario,
            Contraseña:doc.data().Contraseña
        }
        Usuarios.push(usuario)
    });
    return Usuarios
}

export const IniciarSesion = async (usuario:Usuario) => {
    try {
      const usuarios = await obtenerUsuario();
      const usuarioEncontrado = usuarios.find(
        u => u.Usuario === usuario.Usuario && u.Contraseña === usuario.Contraseña
      );
  
      if (usuarioEncontrado) {
        return Promise.resolve('Inicio de sesión exitoso, Bienvenido!!!');
      } else {
        return Promise.reject('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      return Promise.reject('Error al conseguir los usuarios');
    }
  };

  export const RegistrarMensaje = async (mensaje: Mensaje) => {
    try {
      const docRef = await addDoc(collection(db, "Mensajes"), mensaje);
      console.log("ID: ", docRef.id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  export const obtenerMensajes = async () => {
    let mensajes: Mensaje[] = []
    const querySnapshot = await getDocs(collection(db, "Mensajes"));
    querySnapshot.forEach((doc) => {
        let mensaje: Mensaje = {
            Nombre: doc.data().Nombre,
            Apellido: doc.data().Apellido,
            Telefono: doc.data().Telefono,
            Nombreus: doc.data().Nombreus,
            genero: doc.data().genero,
            Correo: doc.data().Correo,
            Tema: doc.data().Tema,
            mensaje: doc.data().mensaje,
            key: doc.id
        }
        mensajes.push(mensaje)
    });
    console.log('Mensajes obtenidos:', mensajes);
    return mensajes
}

export const obtenerMensaje = async (key: string) => {
    const docRef = doc(db, "Mensajes", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let mensaje: Mensaje = {
            Nombre: docSnap.data().Nombre,
            Apellido: docSnap.data().Apellido,
            Telefono: docSnap.data().Telefono,
            Nombreus: docSnap.data().Nombreus,
            genero: docSnap.data().genero,
            Correo: docSnap.data().Correo,
            Tema: docSnap.data().Tema,
            mensaje: docSnap.data().mensaje,
            key: docSnap.id
        }
        console.log('Mensaje obtenido:', mensaje);
        return mensaje
    } else {
        console.log('No se encontró el mensaje con el key:', key);
        return undefined
    }
}

export const actualizarMensaje = async (m: Mensaje) => {
  const ref = doc(collection(db, "Mensajes"), m.key!);
  await updateDoc(ref, { ...m });
}

export const eliminarMensaje = async (key: string) => {
  try {
    const ref = doc(db, 'Mensajes', key);
    await deleteDoc(ref);
    console.log('Documento eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
    throw new Error('No se pudo eliminar el documento');
  }
};