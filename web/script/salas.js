

function clickNuevaSala(){
    $('#crearsala').click(
        function(){
            console.log('click nueva sala')
            newSala();
        }

    );
}


function newSala(){
    var nombreSala = $('#nuevasalanombre')
    var salasForm = getSalasForm();//todas las salas
    salasForm.forEach(
      (element) =>{
        if(nombreSalaValido(element,nombreSala)){
          alert('Nueva Sala creada FALTA DEVOLVERLA')
        }
        else{
          alert('Nombre de Sala no valido')
        }
      }
  
    )
  
}
  
 

  
function getSalasForm(){//retorna las salas del ul en formato JS array
    var salas =  $(".dropdown-item").map(function() {
      console.log(innerHTML);
      return this.innerHTML;
    }).get();
}
  
function nombreSalaValido(sala,nombre){
    if(sala.text === nombre){
      return false
  
    }
    return true  
}
  
  

function whenloaded(){
    clickNuevaSala();
}


$(whenloaded);