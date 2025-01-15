"use client"
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
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(articulo)
        })
    }

    function onChange(e) {
        setArticulo({...articulo,[e.target.name]:e.target.value})
    }

    function filtroArticulo(e){
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
                </label>
                <input type="submit" value="Crear" />
            </form>
        </div>
    )
}