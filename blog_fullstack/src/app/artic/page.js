"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListArtics() {
    const [articulos, setArticulos] = useState([]);

    async function deleteArtic(id) {
        if (window.confirm("¿Estás seguro de que quieres eliminar este articulo?")) {
            const response = await fetch("/api/artic", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                fetchArtics(); 
            } else {
                alert("Error al eliminar el articulo");
            }
        }
    }

    async function fetchArtics() {
        const response = await fetch("/api/artic");
        if (response.ok) {
            const body = await response.json();
            setArticulos(body);
        } else {
            alert("Error al cargar los articulos");
        }
    }

    useEffect(() => {
        fetchArtics();
    }, []);

    return (
        <div>
            <h1>Lista de articulos:</h1>
            {articulos.map((articulo) => (
                <div key={articulo.id}>
                    <Link href={`/artic/${articulo.id}`}>
                        <h2>Titulo: {articulo.titulo}</h2>
                        <h3>Autor: {articulo.autor}</h3>
                        <h3>Fecha publicacion: {articulo.fecha_publicacion}</h3>
                    </Link>
                    <button onClick={() => deleteArtic(articulo.id)}>Eliminar articulo</button>
                </div>
            ))}
            <Link href="/artic/create">Añadir articulo</Link>
        </div>
    );
}
