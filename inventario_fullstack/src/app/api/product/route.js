import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: producto, error } = await supabase.from("producto").select("*");

    if(error){ 
        return new Response(JSON.stringify({error: "No se han podido cargar los productos"}), {status: 404}) 
    }

    return new Response(
        JSON.stringify(producto),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function POST(request) {
    const body = await request.json();

    const { data: producto, error } = await supabase.from("producto").insert({nombre: body.nombre, precio: body.precio, stock: body.stock, descripcion: body.descripcion});
        
    if(error){
        return new Response(
            JSON.stringify({message: "El producto no se ha podido agregar"}),
            { headers: { "Content-Type": "application/json" } }
        );
    }
    
    return new Response(
        JSON.stringify({message: "Producto agregado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
    
}


export async function PUT(request){
    const body = await request.json();
    const { data, error } = await supabase
    .from("producto")
    .update({stock: body.stock})
    .eq("id", body.id);

    console.log("Supabase response:", { data, error });

    if(error){
        return new Response(
            JSON.stringify({message: "El producto no se ha podido actualizar"}),
            { headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify({message: "Producto actualizado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}  

export async function DELETE(request){
    const body = await request.json();
    const { data, error } = await supabase
    .from("producto")
    .delete()
    .eq("id", body.id);

    return new Response(
        JSON.stringify({message: "Producto eliminado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}