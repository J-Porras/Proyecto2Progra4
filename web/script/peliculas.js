

function clickNuevaPelicula(){

    $('#crearpeli').click(
        function(){
            console.log('???')
            newPelicula()
        }   
    );

}



function newPelicula(){
    let nuevaPelicula = {id:"0",nombre:"",precio:"",cartelera:"TRUE"}

    nuevaPelicula.nombre = $('#nuevapelinombre').val()
    nuevaPelicula.precio = $('#nuevapeliprecio').val()


    console.log('Enviando request a peliculas')

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