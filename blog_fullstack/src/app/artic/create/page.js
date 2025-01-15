"use client"
import { Linden_Hill } from "next/font/google";
import Link from "next/link";
import  {useState} from "react"


export default function CreateArtic(){
    const [articulo, setArticulo] = useState({
        titulo: "",
        contenido: "",
        autor: ""
    });

    async function crearArticulo() {
        const response = await fetch("/api/artic", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(articulo)
        })
    }

    function onChange(e) {
        setArticulo({...articulo,[e.target.name]:e.target.value})
    }

    function filtroArticulo(){
        if(articulo.titulo.length > 150 || articulo.titulo.length === 0 || articulo.contenido.length === 0 || articulo.autor.length === 0){
            alert("El titulo no puede tener mas de 150 caracteres y los campos no pueden estar vacios");
            return;
        }
        crearArticulo();
    }

    return (
        <div>
            <h1>Crear Articulo</h1>
            <form onSubmit={filtroArticulo}>
                <label>
                    Titulo:
                    <input
                        name="titulo"
                        type="text"
                        placeholder="titulo"
                        onChange={e => onChange(e)} value={articulo.titulo}
                        maxLength={150}
                        required
                    />
                </label><br />
                <label>
                    Contenido:
                    <input
                        name="contenido"
                        type="text"
                        placeholder="Contenido del articulo"
                        onChange={e => onChange(e)} value={articulo.contenido}
                        required
                    />
                </label><br />
                <label>
                    Autor:
                    <input
                        name="autor"
                        type="text"
                        placeholder="Autor del articulo"
                        onChange={e => onChange(e)} value={articulo.autor}
                        required
                    />
                </label><br />
                <input type="submit" value="Crear" />
                <br />
                <Link href="/artic">Volver</Link>
            </form>
        </div>
    )
}