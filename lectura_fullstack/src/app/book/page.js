"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListBooks() {
    const [libros, setLibros] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    async function deleteBook(id) {
        if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
            const response = await fetch("/api/book", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                fetchBooks(); 
            } else {
                alert("Error al eliminar el libro");
            }
        }
    }

    async function fetchBooks() {
        const response = await fetch("/api/book");
        if (response.ok) {
            const body = await response.json();
            setLibros(body);
        } else {
            alert("Error al cargar los libros");
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    function handleLeidoChange(id) {
        setLibros(libros.map(libro => 
            libro.id === id ? { ...libro, leido: !libro.leido } : libro
        ));

        fetch("/api/book", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, leido: !libros.find(libro => libro.id === id).leido })
        });
    }

    const librosFiltrados = libros.filter(libro => {
        if (filtro === "leidos") return libro.leido;
        if (filtro === "no_leidos") return !libro.leido;
        return true;
    });

    return (
        <div>
            <h1>Lista de libros:</h1>
            <div>
                <label>
                    <input type="radio" value="todos" checked={filtro === "todos"} onChange={handleFiltroChange} />
                    Todos
                </label>
                <label>
                    <input type="radio" value="leidos" checked={filtro === "leidos"} onChange={handleFiltroChange} />
                    Leídos
                </label>
                <label>
                    <input type="radio" value="no_leidos" checked={filtro === "no_leidos"} onChange={handleFiltroChange} />
                    No leídos
                </label>
            </div>
            {librosFiltrados.map((libro) => (
                <div key={libro.id}>
                    <Link href={`/book/${libro.id}`}>
                        <h2>Titulo: {libro.titulo}</h2>
                        <h3>Autor: {libro.autor}</h3>
                        <h3>Fecha publicacion: {libro.fecha_publicacion}</h3>
                    </Link>
                    <label>
                        <input type="checkbox" checked={libro.leido} onChange={() => handleLeidoChange(libro.id)} />
                        Leído
                    </label>
                    <button onClick={() => deleteBook(libro.id)}>Eliminar libro</button>
                </div>
            ))}
            <Link href="/book/create">Añadir libro</Link>
        </div>
    );
}
