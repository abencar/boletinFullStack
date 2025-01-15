"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"

export default function Contact({ params }) {
    const { id } = use(params)
    const [articulo, setArticulo] = useState()

    async function fetchArticulo() {
        const url = await fetch("/api/artic/articdata?id=" + id)
        const cont = await url.json()
        setArticulo(cont[0])
    }

    useEffect(() => {
        fetchArticulo()
    }, []) 

    if (articulo) {
        return (
            <div>
                <h1>Información de Contacto</h1>
                <p>Titulo: {articulo.titulo}</p>
                <p>Contenido: {articulo.contenido}</p>
                <p>Autor: {articulo.autor}</p>
                <p>Fecha de publicacion: {articulo.fecha_publicacion}</p>
                <br />
                <Link href="/artic">Volver</Link>
            </div>)
    } else {
        return <div> Cargando... </div>
    }
}
