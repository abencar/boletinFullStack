import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)


export async function POST(request) {
    const body = await request.json();

    const { data: book, error } = await supabase.from("libro").insert({ titulo: body.titulo, autor: body.autor });

    if (error) {
        return new Response(
            JSON.stringify({ message: "El libro no se ha podido agregar" }),
            { headers: { "Content-Type": "application/json" } }
        );
    }
    
    if (body.titulo && body.autor) {
        return new Response(
            JSON.stringify({ message: "Libro agregado correctamente" }),
            { headers: { "Content-Type": "application/json" } }
        );
    }

}
