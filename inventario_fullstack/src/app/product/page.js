"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../globals.css";

export default function ListProducts() {
    const [articulos, setArticulos] = useState([]);
    const [newStock, setNewStock] = useState({});
    const [editingStock, setEditingStock] = useState({});

    async function fetchProducts() {
        const response = await fetch("/api/product");
        if (response.ok) {
            const body = await response.json();
            setArticulos(body);
        } else {
            alert("Error al cargar los productos");
        }
    }

    async function updateStock(id) {
        const stock = newStock[id];
        if (stock === undefined) return;

        const response = await fetch("/api/product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, stock }),
        });

        if (response.ok) {
            fetchProducts();
            setEditingStock({ ...editingStock, [id]: false });
        } else {
            alert("Error al actualizar el stock");
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Lista de productos:</h1>
            {articulos.map((producto) => {
                const isEditing = editingStock[producto.id];
                return (
                    <div key={producto.id} className={producto.stock === 0 ? "stock-zero" : ""}>
                        <h2>{producto.nombre}</h2>
                        <h3>{producto.precio}</h3>

                        {isEditing ? (
                            <>
                                <input
                                    type="number"
                                    min={0}
                                    value={newStock[producto.id] || producto.stock}
                                    onChange={(e) => setNewStock({ ...newStock, [producto.id]: e.target.value })}
                                    placeholder="Nuevo stock"
                                />
                                <button onClick={(e) => { e.stopPropagation(); updateStock(producto.id); }}>Guardar</button>
                            </>
                        ) : (
                            <>
                                <h3>{producto.stock}</h3>
                                <button onClick={(e) => { e.stopPropagation(); setEditingStock({ ...editingStock, [producto.id]: true }); setNewStock({ ...newStock, [producto.id]: producto.stock }); }}>
                                    Actualizar stock
                                </button>
                            </>
                        )}
                    </div>
                );
            })}
            <Link href="/product/create">Añadir producto</Link>
        </div>
    );
}
