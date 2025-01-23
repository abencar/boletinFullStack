"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListProducts() {
    const [articulos, setArticulos] = useState([]);


    async function fetchaProducts() {
        const response = await fetch("/api/product");
        if (response.ok) {
            const body = await response.json();
            setArticulos(body);
        } else {
            alert("Error al cargar los productos");
        }
    }

    useEffect(() => {
        fetchaProducts();
    }, []);

    return (
        <div>
            <h1>Lista de productos:</h1>
            {articulos.map((producto) => (
                <div key={producto.id}>
                    <Link href={`/product/${producto.id}`}>
                        <h2>{producto.titulo}</h2>
                        <h3>{producto.autor}</h3>
                        <h3>{producto.fecha_publicacion}</h3>
                    </Link>
                    <button onClick={() => deleteArtic(producto.id)}>Eliminar articulo</button>
                </div>
            ))}
            <Link href="/artic/create">Añadir articulo</Link>
        </div>
    );
}
