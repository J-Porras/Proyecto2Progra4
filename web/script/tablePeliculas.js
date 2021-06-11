var peliculas_ = new Array();


var defaultTablePeliculas = `
<table class="mx-auto table align-middle" id="tablePeliculas">
  <thead>
    <tr class="table-secondary mx-auto">
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Precio</th>
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
    '</tr>')
  $('#tablePeliculasbody').append(row)
}


function whenloaded(){
    $('body').append(defaultTablePeliculas); 
    getPeliculas();
}

$(whenloaded)