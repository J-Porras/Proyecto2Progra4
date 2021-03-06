var nuevaProyeccion ={
    fecha:"",
    hora:"",    
    id:"0",
    pelicula_id:"0",
    sala_id:"0",
}

function clickNuevaProyeccion(){
    $('#crearProyec').click(
        function(){
            newProyeccion()
        }
    );
}


function newProyeccion(){
    nuevaProyeccion.pelicula_id = actualPeliculas.find(
        element => element.nombre == selectedPeli.val()
    ).id

    nuevaProyeccion.fecha = selectedFecha;
    nuevaProyeccion.hora = selectedHora.val();
    nuevaProyeccion.sala_id = actualSalas.find(
        element => element.nombre == selectedSala.val()
    ).id



    let request = new Request(url + "api/proyecciones",
    { method: 'POST',headers :{'Content-Type': 'application/json'},
        body: JSON.stringify(nuevaProyeccion)
    }
    );

    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            return;
        }
    })(); 
    waitload();


}


function waitload(){
    location.reload();
}


function whenloaded(){
    clickNuevaProyeccion()
}

$(whenloaded)    