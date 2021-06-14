

function clickNuevaPelicula(){

    $('#crearpeli').click(
        function(){
            newPelicula()
        }   
    );

}



function newPelicula(){
    let nuevaPelicula = {id:"0",nombre:"",precio:"",cartelera:"FALSE"}

    nuevaPelicula.nombre = $('#nuevapelinombre').val()
    nuevaPelicula.precio = $('#nuevapeliprecio').val()
    if ($('#check_id').is(":checked"))
    {
        nuevaPelicula.cartelera = "TRUE"
    }


   

    let request = new Request(url + "api/peliculas",
    { method: 'POST',headers :{'Content-Type': 'application/json'},
        body: JSON.stringify(nuevaPelicula)
    }
    );

    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            return;
        }
    })(); 

}

function whenloaded(){
    clickNuevaPelicula();
}

$(whenloaded)