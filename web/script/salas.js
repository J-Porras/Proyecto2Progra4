

function clickNuevaSala(){
  $('#crearsala').click(
    function(){
      if(dataIsCompleteSala()){
        if(user.getRol()==0){
          newSala()  
        }
        else{
          console.log('User not valid')
        }
      }
      else{
        console.log('Data is not Complete')
      }
        
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
  else{
    console.log('Nombre de Sala no valido')
  }

}

function dataIsCompleteSala(){
  let nombreSala = $('#nuevasalanombre').val()
  if(!nombreSala){//el nombre esta vacio
    return false
  }
  //el nombre es solo whitespaces, casi lo mismo que vacio
  if (!nombreSala.replace(/\s/g, '').length) {
    return false
  }
  return true;
}

  
function nombreSalaValido(element){
    if(!element.nombre)
      return false
    if(element.nombre === $('#nuevasalanombre').val()){
      return false
    }
    return true  
}
