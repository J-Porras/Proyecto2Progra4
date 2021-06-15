var peliculas_ = new Array();


var defaultTablePeliculas = `
<table class="text-center mx-auto table align-middle" id="tablePeliculas">
  <thead>
    <tr class="table-secondary mx-auto">
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
      <th scope="col">En Proyeccion</th>
      <th scope="col">Ilustracion</th>

    </tr>
  </thead>
    <tbody id="tablePeliculasbody">
  </tbody>
</table>
`;



function getPeliculas(){ //from DB
    let request = new Request(url + "api/peliculas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        peliculas_ = await response.json();
        changeTable();
    })();
}

function changeTable(){
  if (peliculas_){
    peliculas_.forEach(
      (index)=>{
        newRow(index);
      }
    );
  }
   
}

function newRow(element){
    var row = $('#tablePeliculas > tbody:last-child')
    .append('<tr class="table-secondary .d-sm-flex">'+
    '<th scope="row">'+element.id+'</th>'+
    '<td >'+element.nombre+'</td>'+
    '<td >'+element.precio+'</td>'+
    '<td >'+estaEnCartelera(element)+'</td>'+
    "<td><img src='"+url+"api/peliculas/"+element.id+"/imagen' class='icon_large img-thumbnail img-responsive w-60 p-3' ></td>"+                

    '</tr>')
  $('#tablePeliculasbody').append(row)
}

function estaEnCartelera(themovie){
  let checkbox ="--"
  if(themovie.cartelera){
    checkbox =  '<input class="form-check-input" disabled="disabled" type="checkbox" value="" checked>'
  }
  else{
    checkbox =  '<input class="form-check-input" disabled="disabled" type="checkbox" value="">'

  }
  return checkbox

}

function whenloaded(){
  $('#tablePeliculasContainer').append(defaultTablePeliculas); 
  getPeliculas();
}

$(whenloaded)