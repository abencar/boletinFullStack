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

    const deletePastEvents = async () => {
        const now = new Date();
        const pastEvents = eventosFiltrados.filter(evento => new Date(evento.fecha) < now);
        
        for (const evento of pastEvents) {
            await fetch("/api/event", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: evento.id })
            });
        }
        
        fechtEvents();
    };

    return (
        <div>
            <h1>Calendario de eventos:</h1>
            <button onClick={deletePastEvents}>Eliminar eventos pasados</button>
            {eventosFiltrados
                .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                .map((evento) => (
                    <div key={evento.id}>
                        <Link href={`/event/${evento.id}`}>
                            <h2>Titulo: {evento.titulo}</h2>
                            <h3>Fecha: {evento.fecha}</h3>
                            <h3>Ubicacion: {evento.ubicacion}</h3>
                        </Link>
                    </div>
                ))}
            <Link href="/event/create">Añadir evento</Link>
        </div>
    );
}