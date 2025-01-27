"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventPage() {
    const [fechaFiltro, setFechaFiltro] = useState('');
    const [eventos, setEventos] = useState([]);


    async function fechtEvents() {
        const response = await fetch("/api/event");
        if (response.ok) {
            const body = await response.json();
            setEventos(body);
        } else {
            alert("Error al cargar los eventos");
        }
    }

    useEffect(() => {
        fechtEvents();
    }, []);

    const handleFechaFiltroChange = (e) => {
        setFechaFiltro(e.target.value);
    };

    const eventosFiltrados = eventos.filter(evento => 
        fechaFiltro === '' || evento.fecha === fechaFiltro
    );


    async function deleteEvent(id) {

            const response = await fetch("/api/event", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                fechtEvents(); 
            } else {
                alert("Error al eliminar el evento");
            }
        }

    return (
        <div>
            <h1>Calendario de eventos:</h1>
            <input 
                type="date" 
                value={fechaFiltro} 
                onChange={handleFechaFiltroChange} 
                placeholder="Filtrar por fecha" 
            />
            {eventosFiltrados.map((evento) => (
                <div key={evento.id}>
                    <Link href={`/event/${evento.id}`}>
                        <h2>Titulo: {evento.titulo}</h2>
                        <h3>Fecha: {evento.fecha}</h3>
                        <h3>Ubicacion: {evento.ubicacion}</h3>
                    </Link>
                    <button onClick={() => deleteEvent(evento.id)}>Eliminar Evento</button>
                </div>
            ))}
            <Link href="/event/create">Añadir evento</Link>
        </div>
    );
}