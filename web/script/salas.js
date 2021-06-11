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

  let request = new Request(url + "api/salas/add",
  { method: 'POST',headers :{'Content-Type': 'application/json'},
    body: JSON.stringify(nuevaSala)
  }
  );

  (async ()=>{
    const response = await fetch(request);
    if (!response.ok) {
      return;
    }
  })(); 

}

function newSala(){
  var nombreSala = $('#nuevasalanombre').val()
  //.every() checkea si todos los objetos de un array cumplen una condicion
  let isValid = salas.every(nombreSalaValido)
  if(isValid){
    addSala();
  }

}

  
function nombreSalaValido(element){
    if(!element.nombre)
      return false
    if(element.nombre === $('#nuevasalanombre').val()){
      return false
    }
    return true  
}
