var nuevaPelicula = {id:"0",nombre:"",precio:"",cartelera:"0"}

function clickNuevaPelicula(){

    $('#crearpeli').click(
        function(){
            if(dataIsCompletePeliculas()){
                if(user.getRol()==0){
                    newPelicula()
                }
                else{
                    console.log('User not valid')
                }
            }
            else{
                console.log('Data is not complete')
            }
            
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

function dataIsCompletePeliculas(){
    let nomPeli = $('#nuevapelinombre').val()
    if(!nomPeli){//el nombre esta vacio
        return false
    }
    //el nombre es solo whitespaces, casi lo mismo que vacio
    if (!nomPeli.replace(/\s/g, '').length) {
        return false
    }

    let precioPeli = $('#nuevapeliprecio').val()
    if(!precioPeli){//el nombre esta vacio
        return false
    }
    //el nombre es solo whitespaces, casi lo mismo que vacio
    if (!precioPeli.replace(/\s/g, '').length) {
        return false
    }
    

    return true;
}


function whenloaded(){
    clickNuevaPelicula();
}

$(whenloaded)