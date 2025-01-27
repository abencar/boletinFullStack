"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"

export default function Event({ params }) {
    const { id } = use(params)
    const [evento, setEvent] = useState()

    async function fetchEventData() {
        const url = await fetch("/api/event/eventdata?id=" + id)
        const event = await url.json()
        setEvent(event[0])
    }

    async function sumarAsistente() {
        const response = await fetch("/api/event/eventdata", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, asistentes: evento.asistentes + 1 })
        });

        if (response.ok) {
            fetchEventData(); // Actualiza los datos del evento
        } else {
            alert("Error al registrar el asistente");
        }
    }

    useEffect(() => {
        fetchEventData()
    }, []) 

    if (evento) {
        return (
            <div>
                <h1>{evento.titulo}</h1>
                <h2>{evento.fecha}</h2>
                <p>{evento.descripcion}</p>
                <p>{evento.ubicacion}</p>
                <p>Asistentes: {evento.asistentes}</p>
                <button onClick={sumarAsistente}>Registrar Asistente</button>
                <br />
                <Link href="/event">Volver</Link>
            </div>)
    } else {
        return <div> Cargando... </div>
    }
}
