import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: articulo, error } = await supabase.from("articulo").select("id, titulo, autor, fecha_publicacion");

    if(error){ 
        return new Response(JSON.stringify({error: "No se han podido cargar los articulos"}), {status: 404}) 
    }

    return new Response(
        JSON.stringify(articulo),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function POST(request) {
    const body = await request.json();

    const { data: articulo, error } = await supabase.from("articulo").insert({titulo: body.titulo, autor: body.autor, contenido: body.contenido});
        
    if(error){
        return new Response(
            JSON.stringify({message: "El articulo no se ha podido agregar"}),
            { headers: { "Content-Type": "application/json" } }
        );
    }
    if(body.titulo && body.autor && body.contenido){
        if(body.titulo.length >= 150){
    return new Response(
        JSON.stringify({message: "Usuario agregado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
    }  
}

}

export async function DELETE(request){
    const body = await request.json();
    const { data, error } = await supabase
    .from("articulo")
    .delete()
    .eq("id", body.id);

    return new Response(
        JSON.stringify({message: "Contacto eliminado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}