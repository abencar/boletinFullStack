import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request) {
    const body = await request.json();

    const { data: habito, error } = await supabase.from("habitos").insert({nombre: body.nombre, descripcion: body.descripcion, fecha: body.fecha});
        
    if(error){
        return new Response(
            JSON.stringify({message: "El habito no se ha podido agregar"}),
            { headers: { "Content-Type": "application/json" } }
        );
    }
    
    return new Response(
        JSON.stringify({message: "Habito agregado correctamente"}),
        { headers: { "Content-Type": "application/json" } }
    );
    
}