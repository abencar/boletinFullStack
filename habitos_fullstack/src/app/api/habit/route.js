import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const { data: libro, error } = await supabase.from("habitos").select("*");

    if(error){ 
        return new Response(JSON.stringify({error: "No se han podido cargar los libros"}), {status: 404}) 
    }

    return new Response(
        JSON.stringify(libro),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function PUT(request){
    const body = await request.json();
    const { data, error } = await supabase
    .from("habitos")
    .update({completado: body.completado})
    .eq("id", body.id);

    if(error){
        return new Response(
            JSON.stringify({message: "El Habito no se ha podido actualizar"}),
            { headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify({message: "Habito actualizado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}  


export async function DELETE(request){
    const body = await request.json();
    const { data, error } = await supabase
    .from("habitos")
    .delete()
    .eq("id", body.id);

    return new Response(
        JSON.stringify({message: "Habito eliminado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
}