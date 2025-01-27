"use client"
import Link from "next/link";
import { useState } from "react";

export default function CreateEvent() {
    const initialState = {
        titulo: "",
        descripcion: "",
        fecha: "",
        ubicacion: "",
        asistentes: ""
    };

    const [evento, setEvento] = useState(initialState);

    async function crearEvento() {
        try {
            const response = await fetch("/api/event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento)
            });
            alert("Evento creado con éxito");
            setEvento(initialState);
        } catch (error) {
            console.error("Error al crear el evento:", error);
            alert(`Error: ${error.message}`);
        }
    }

    function onChange(e) {
        setEvento({ ...evento, [e.target.name]: e.target.value });
    }

    function filtroEvento() {
        const fechaEvento = new Date(evento.fecha);
        const fechaActual = new Date();

        if (evento.titulo.length === 0 || evento.fecha.length === 0 || evento.ubicacion.length === 0) {
            alert("Los campos titulo, fecha y ubicacion son obligatorios");
            return;
        }

        if (fechaEvento <= fechaActual) {
            alert("La fecha debe ser futura");
            return;
        }

        crearEvento();
    }

    return (
        <div>
            <h1>Crear Evento</h1>
            <form onSubmit={(e) => {e.preventDefault(); filtroEvento(); }}>
                <label>
                    Titulo:
                    <input
                        name="titulo"
                        type="text"
                        placeholder="titulo"
                        required
                        value={evento.titulo}
                        onChange={onChange}
                    />
                </label>
                <br />
                <label>
                    Descripcion:
                    <textarea
                        name="descripcion"
                        required
                        placeholder="descripcion"
                        value={evento.descripcion}
                        onChange={onChange}
                    />
                </label>
                <br />
                <label>
                    Fecha:
                    <input
                        required
                        name="fecha"
                        type="datetime-local"
                        value={evento.fecha}
                        onChange={onChange}
                    />
                </label>
                <br />
                <label>
                    Ubicacion:
                    <input
                        name="ubicacion"
                        type="text"
                        required
                        placeholder="ubicacion"
                        value={evento.ubicacion}
                        onChange={onChange}
                    />
                </label>
                <br />
                <label>
                    Asistentes:
                    <input
                        name="asistentes"
                        type="number"
                        placeholder="asistentes"
                        value={evento.asistentes}
                        onChange={onChange}
                    />
                </label>
                <br />
                <button type="submit">Crear Evento</button>
            </form>
            <br />
            <Link href="/event">Volver</Link>
        </div>
    );
}