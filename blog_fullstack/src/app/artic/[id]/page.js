"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"

export default function Contact({ params }) {
    const { id } = use(params)
    const [articulo, setContacto] = useState()

    async function fetchContacto() {
        const url = await fetch("/api/artic/articdata?id=" + id)
        const cont = await url.json()
        setContacto(cont[0])
    }

    useEffect(() => {
        fetchContacto()
    }, []) 

    if (articulo) {
        return (
            <div>
                <h1>{articulo.titulo}</h1>
                <h2>{articulo.autor}</h2>
                <p>{articulo.fecha_publicacion}</p>
                <p>{articulo.contenido}</p>
            
                <Link href="/artic">Volver</Link>
            </div>)
    } else {
        return <div> Cargando... </div>
    }
}
