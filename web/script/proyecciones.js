var nuevaProyeccion ={
    id:"-1",
    salaid:"-1",
    fecha:"",
    hora:"",
    pelicula_id:"-1",
}

function clickNuevaProyeccion(){
    $('#crearpeli').click(
        function(){
            new newProyeccion()
        }
    );
}


function newProyeccion(){
    nuevaProyeccion.pelicula_id = actualPeliculas.find(
        element => element.nombre = selectedPeli.val()
    ).id

    nuevaProyeccion.fecha = selectedFecha;
    nuevaProyeccion.hora = selectedHora;
    nuevaProyeccion.salaid = actualSalas.find(
        element => element.nombre = selectedSala.val()
    ).id

    console.log('Enviando request nueva proyeccio')

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
    clickNuevaProyeccion()
}

$(clickNuevaProyeccion)    