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
      <th scope="col">Fecha</th>
      <th scope="col"> Hora(24h) </th>

    </tr>
  </thead>
    <tbody id="tableTiquetesBody">
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
      allPeliculas = await response.json();
      
  })();
}



function getProyecciones(){
  let request = new Request(url + "api/proyecciones",
  { method: 'GET'}
  );

  (async ()=>{
      const response = await fetch(request);
      if (!response.ok) {
          return;
      }
      
      allProyecciones = await response.json();
      console.log(allProyecciones)
      getPeliculas()
      getMisTiquetes();
  })(); 
}




function getMisTiquetes(){

    let id_actual = JSON.parse(localStorage.getItem('usuario_actual')).id

    let request = new Request(url + "api/tiquetes/"+id_actual,
      {method: 'GET', headers: { }}
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        misTiquetes = await response.json();
        console.log("tiquetes:"+misTiquetes)
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
  console.log("ELemento:"+element)
    let row = $('#tableTiquetes > tbody:last-child')
    .append('<tr class="table-secondary .d-sm-flex">'+
        '<th scope="row">'+element.id+'</th>'+
        '<td >'+getNamePelibyId(element.id_proyeccion)+'</td>' +
        '<td >'+element.id_cliente +'</td>' +
        '<td >'+element.asiento +'</td>' + 
        '<td >'+getProyecbyId(element.id_proyeccion).fecha +'</td>' + 
        '<td >'+getProyecbyId(element.id_proyeccion).hora +'</td>' + 
        '</tr>'
    )
  $('#tableSalasbody').append(row)
}

function render(){
  $('#tableTiquetesContainer').append(tableTiquetesDefault)
}


function getProyecbyId(idproyec){
  let proyeccion = allProyecciones.find(
    element => element.id == idproyec
  )
  return (proyeccion)
}


function getNamePelibyId(idproyec){ 
  var proyeccion = getProyecbyId(idproyec)

  for (let index = 0; index < allPeliculas.length; index++) {

    if(allPeliculas[index].id == proyeccion.pelicula_id){
      return allPeliculas[index].nombre
    }
    
  }
  return "---"

}



function whenloaded(){
  render()
  getProyecciones()
}

$(whenloaded)