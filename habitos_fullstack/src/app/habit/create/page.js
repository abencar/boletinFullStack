"use client"
import Link from "next/link";
import React, { useState } from 'react';

export default function CrearHabito() {
    const [habito, setHabito] = useState({
        nombre: "",
        descripcion: "",
        fecha: ""
    });

    async function crearArticulo() {
        const response = await fetch("/api/habit/habitdata", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(habito)
        });
    }

    function onChange(e) {
        setHabito({...habito, [e.target.name]: e.target.value});
    }

    function filtroHabitos(e) {
        const fechaActual = new Date();
        const fechaIngresada = new Date(habito.fecha);

        if (fechaIngresada < fechaActual) {
            alert("La fecha no puede estar en el pasado.");
            return;
        }

        crearArticulo();
    }

    return (
        <div>
            <h1>Crear habito</h1>
            <form onSubmit={filtroHabitos}>
                <label>
                    Nombre:
                    <input
                        name="nombre"
                        type="text"
                        placeholder="nombre"
                        onChange={e => onChange(e)} value={habito.nombre}
                        required
                    />
                </label><br />
                <label>
                    Descripcion:
                    <input
                        name="descripcion"
                        type="text"
                        placeholder="descripcion"
                        onChange={e => onChange(e)} value={habito.descripcion}
                    />
                </label><br />
                <label>
                    Fecha:
                    <input
                        name="fecha"
                        type="date"
                        onChange={e => onChange(e)} value={habito.fecha}
                        required
                    />
                </label><br />
                <button type="submit">Crear</button>
                <br />
                <Link href="/habit">Volver</Link>
            </form>
        </div>
    );
}