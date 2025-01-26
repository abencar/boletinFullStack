"use client"
import Link from "next/link";
import { useState } from "react";

export default function CreateProduct() {
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        stock: "",
        descripcion: ""
    });

    async function crearProducto() {
        try {
            console.log("Enviando producto:", producto);
            const response = await fetch("/api/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            });
            console.log("Respuesta del servidor:", response);
            if (!response.ok) {
                throw new Error("Error en la creación del producto");
            }
            alert("Producto creado exitosamente");
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    }

    function onChange(e) {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    }

    function filtroProducto() {
        if (producto.nombre.length === 0 || producto.precio.length === 0 || producto.stock.length === 0) {
            alert("Nombre, precio y stock son obligatorios y no pueden estar vacíos.");
            return;
        }
        if (isNaN(producto.precio) || isNaN(producto.stock)) {
            alert("Precio y stock deben ser números.");
            return;
        }
        if (Number(producto.stock) < 0) {
            alert("El stock no puede ser negativo.");
            return;
        }
        crearProducto();
    }

    return (
        <div>
            <h1>Crear Producto</h1>
            <form onSubmit={(e) => { e.preventDefault(); filtroProducto(); }}>
                <label>
                    Nombre:
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        value={producto.nombre}
                        onChange={onChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Precio:
                    <input
                        name="precio"
                        type="text"
                        placeholder="Precio"
                        value={producto.precio}
                        onChange={onChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Stock:
                    <input
                        name="stock"
                        type="text"
                        placeholder="Stock"
                        value={producto.stock}
                        onChange={onChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Descripción:
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={producto.descripcion}
                        onChange={onChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
}