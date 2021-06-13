

function clickNuevaPelicula(){

    $('#crearpeli').click(
        function(){
            console.log('nuevo achis')
        }
    );

}



function newPelicula(){
    let nuevaPelicula = {id:"0",nombre:"",precio:"",cartelera:"TRUE"}

    nuevaPelicula.nombre = $('#nuevapelinombre').val()
    nuevaPelicula.precio = $('#nuevapeliprecio').val()

    let request = new Request(url + "api/proyecciones",
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