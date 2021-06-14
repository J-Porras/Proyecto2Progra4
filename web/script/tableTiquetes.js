var misTiquetes = new Array()
let allPeliculas = new Array()
let allProyecciones = new Array()

var tableTiquetesDefault = `
<table class="table mx-auto mt-3 col-md-12 " id="tableTiquetes"  style="width: 500px;">
  <thead>
    <tr class="table-secondary mx-auto">
      <th scope="col">ID</th>
      <th scope="col">Numero de Proyeccion</th>
      <th scope="col">Cliente</th>
      <th scope="col">Asiento</th>
    </tr>
  </thead>
    <tbody id="tableTiquetesBody">
  </tbody>
</table>
`;


/*
function getPeliculas(){
    let request = new Request(url + "api/peliculas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        allPeliculas = await response.json();
        getMisTiquetes()
        
    })();
}
*/



function getMisTiquetes(){

    let id_actual = JSON.parse(localStorage.getItem('usuario_actual')).id

    let request = new Request(url + "api/tiquetescComprados/misTiquetes",
        { method: 'GET',headers :{'Content-Type': 'application/json'},
        body: JSON.stringify(id_actual) }
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        misTiquetes = await response.json();
        renderTable()
        
    })();
}

function renderTable(){
    misTiquetes.forEach(
        (index) =>{
            newRowTable(index);
        }
    );
}

function newRowTable(element){
    let row = $('#tableTiquetes > tbody:last-child')
    .append('<tr class="table-secondary .d-sm-flex">'+
        '<th scope="row">'+element.id+'</th>'+
        '<td >'+element.id_proyec+'</td>' +
        '<td >'+element.id_cliente +'</td>' +
        '<td >'+element.asiento +'</td>' + 
        '</tr>'
    )
  $('#tableSalasbody').append(row)
}

function render(){
  $('#tableTiquetesContainer').append(tableTiquetesDefault)
}

function whenloaded(){
  render()
  getMisTiquetes()
}

$(whenloaded)