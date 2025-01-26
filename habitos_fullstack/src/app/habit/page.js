"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListHabits() {
    const [habitos, setHabitos] = useState([]);
    const [filtro, setFiltro] = useState("todos");

    async function deleteHabit(id) {

        const response = await fetch("/api/habit", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        });

        if (response.ok) {
            fetchHabits();
        } else {
            alert("Error al eliminar el habito");
        }

    }

    async function fetchHabits() {
        const response = await fetch("/api/habit");
        if (response.ok) {
            const body = await response.json();
            setHabitos(body);
        } else {
            alert("Error al cargar los habitos");
        }
    }

    async function markHabitCompleted(id) {
        const response = await fetch("/api/habit", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, completado: true })
        });

        if (response.ok) {
            fetchHabits();
        } else {
            alert("Error al marcar el habito como completado");
        }
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    function handleFiltroChange(event) {
        setFiltro(event.target.value);
    }

    function eliminarHabitosCompletados() {
        habitos.filter(habito => habito.completado).forEach(habito => deleteHabit(habito.id));
    }

    return (
        <div>
            <h1>Hábitos del día</h1>
            <button onClick={eliminarHabitosCompletados}>Borrar todos los completados</button>
            <table>
                <thead>
                    <tr>
                        <th>Habito</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {habitos.map(habito => (
                        <tr key={habito.id}>
                            <td>{habito.nombre}</td>
                            <td>{habito.descripcion}</td>
                            <td>
                                {!habito.completado && (
                                    <button onClick={() => markHabitCompleted(habito.id)}>Completado</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link href="/habit/create">Crear nuevo habito</Link>
        </div>
    );
}