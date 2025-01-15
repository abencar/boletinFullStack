import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqpvixmzjnqsjlwgirfx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcHZpeG16am5xc2psd2dpcmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNzksImV4cCI6MjA1MjQyMzI3OX0.eOq6jIOMrUJZ8seEs1rNlXV7tNee-utFr9z18toDskw'
const supabase = createClient(supabaseUrl, supabaseKey)


export async function GET(request) {

    const {searchParams} = new URL(request.url)
    const idBuscado = searchParams.get("id")

    const { data: articulo, error } = await supabase.from("articulo").select("*").eq("id", idBuscado);

    if(articulo) {
        return new Response(JSON.stringify(articulo), {status:200})
    }else{
        return new Response(JSON.stringify({error: "No existe"}), {status: 404})
    }
}
