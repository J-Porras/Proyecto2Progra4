

function clickNuevaSala(){
    $('#crearsala').click(
      
        function(){
          newSala()
        }

    );
}

function addSala(){ //sala a la DB
  let nuevaSala = {id:"0",nombre:""}

  nuevaSala.nombre = $('#nuevasalanombre').val()

  let request = new Request(url + "api/salas",
  { method: 'POST',headers :{'Content-Type': 'application/json'},
    body: JSON.stringify(nuevaSala)
  }
  );

  (async ()=>{
    const response = await fetch(request);
    if (!response.ok) {
      return;
    }
    alert('Insertado en DB')
  })(); 

}

function newSala(){
  var nombreSala = $('#nuevasalanombre').val()


  salas.forEach(//la variable  salas vienen de tableSalas
    (element)=>{
      if(nombreSalaValido(element,nombreSala)){
        addSala()
        console.log('Sala agregada')
        return;
      }
      else{
        alert('Nombre de Sala no valido')
      }
    }

  )

}

  
function nombreSalaValido(sala,nombre){
    if(sala.nombre === nombre){
      return false
    }
    return true  
}
