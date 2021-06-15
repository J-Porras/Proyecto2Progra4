var nuevaPelicula = {id:"0",nombre:"",precio:"",cartelera:"0"}

function clickNuevaPelicula(){

    $('#crearpeli').click(
        function(){
            newPelicula()
        }   
    );

}



function newPelicula(){

    nuevaPelicula.nombre = $('#nuevapelinombre').val()
    nuevaPelicula.precio = $('#nuevapeliprecio').val()
    if ($('#estaCartelera').is(":checked"))
    {
        nuevaPelicula.cartelera = "1"
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
    addImagen();
}

function addImagen(){
    

    var imagenData = new FormData();
    imagenData.append("id", (peliculas_.length+1));
    imagenData.append("imagen", $("#imagen").get(0).files[0]); 
    
    let request = new Request(url+'api/peliculas/'+(peliculas_.length+1)+"/imagen",
    {method: 'POST',body: imagenData});

    (async ()=>{
        const response = await fetch(request);
        if (!response.ok){
            return;
        }              
    })();    
}


function whenloaded(){
    clickNuevaPelicula();
}

$(whenloaded)