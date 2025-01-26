"use client"
import Link from "next/link";
import { useState } from "react";

export default function CreateBook() {
    const [book, setBook] = useState({
        titulo: "",
        autor: ""
    });

    async function crearBook() {
        try {
            console.log("Enviando libro:", book);
            const response = await fetch("/api/book/bookdata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error en la creación del libro: ${response.status} ${response.statusText} - ${errorText}`);
            }
            alert("Libro creado exitosamente");
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    }

    function onChange(e) {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    function filtroBook() {
        if (book.titulo.length === 0 || book.autor.length === 0) {
            alert("Titulo y autor son obligatorios y no pueden estar vacíos.");
            return;
        }
        crearBook();
    }

    return (
        <div>
            <h1>Añadir libro</h1>
            <form onSubmit={(e) => { e.preventDefault(); filtroBook(); }}>
                <input type="text" required name="titulo" value={book.titulo} onChange={onChange} placeholder="Título" />
                <input type="text"  required name="autor" value={book.autor} onChange={onChange} placeholder="Autor" />
                <button type="submit">Crear Libro</button>
            </form>
            <Link href="/book">Volver a la lista de libros</Link>
        </div>
    );
}