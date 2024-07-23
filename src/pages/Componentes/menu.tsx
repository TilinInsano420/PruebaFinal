import Link from "next/link";

export const Menu = () => {
    return (
        <>
            <nav className="w">
                <Link href="/Componentes/Registro" className="l">Registrar Usuario</Link>
                <br />
                <br />
                <Link href="/Componentes/Mensaje" className="l">Enviar Mensaje</Link>
                <br />
                <br />
                <Link href="/Componentes/Visualizar" className="l">Visualizar lo registrado</Link>
                <br />
                <br />
                <Link href="/" className="l">Salir</Link>
            </nav>
        </>
    );
}

export default Menu;
