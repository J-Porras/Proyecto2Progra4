 actualPeliculas = new Array()
var actualSalas = new Array()
var proyeccionesArray = new Array();
var actualProyecciones = new Array();

var selectedPeli;
var selectedHora;
var selectedSala;
var selectedFecha;


var dropdownHora = `
<select class="form-select mt-2" id="dropdownHoras" aria-label="size 4 select example">
  <option selected>Seleccionar Hora inicial</option>
</select>`
;

var dropdownPeliculas = `
<select class="form-select mt-2" id="dropdownPeliculas" aria-label="size 4 select example">
  <option selected>Seleccionar Pelicula</option>
</select>`
;

var dropdownSalas = `
<select class="form-select mt-2" id="dropdownSalas"  aria-label="size 4 select example">
  <option selected>Seleccionar Sala</option>
</select>`
;


var calendario = `
  <p class="mt-2">Fecha de la Proyeccion: <input type="text" id="datepicker"></p>

`;


var tableProyecciones = `
<table class="mx-auto table align-middle" id="tableProyecciones">
  <thead>
    <tr class="table-secondary mx-auto">
      <th scope="col">Sala</th>
      <th scope="col">Pelicula</th>
      <th scope="col">Fecha</th>
      <th scope="col">Hora</th>
    </tr>
  </thead>
    <tbody id="tableProyeccionesbody">
  </tbody>
</table>
`;


function loadHoras(){
    var newhour;
    for (let index = 6; index < 24; index++) {
      newhour = $('<option/>',{
        text : index+':00',
        id: 'Hora'+index,

      }) 

      $('#dropdownHoras').append(newhour)
    }
}


function getPeliculasDropdown(){ //from DB
    let request = new Request(url + "api/peliculas",
        { method: 'GET',headers :{} }
    );
    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        actualPeliculas = await response.json();
        loadPeliculas();
    })();
}

function getSalasDropdown(){

  let request = new Request(url + "api/salas",
      { method: 'GET',headers :{} }
  );
  (async ()=>{
    const response = await fetch(request);
    if (!response.ok) {

      return;
    }

    actualSalas = await response.json();
    loadSalas();
  })();
}

function getProyecciones(){
  let request = new Request(url + "api/proyecciones",
      { method: 'GET',headers :{} }
  );
  (async ()=>{
    const response = await fetch(request);
    if (!response.ok) {

      return;
    }
    actualProyecciones = await response.json();
    console.log(actualProyecciones)
    loadTableProyecc();
  })();
}

function loadPeliculas(){
  var peliculaOption;
  
  actualPeliculas.forEach(
    (index)=>{
      peliculaOption = $('<option/>',{
        text : index.nombre,
        id: index.id,

      })
      $('#dropdownPeliculas').append(peliculaOption)
    }
  );
}




function loadSalas(){
  var salaOption;
  
  actualSalas.forEach(
    (index)=>{
      salaOption = $('<option/>',{
        text : index.nombre,
        id: index.id,

      })
      $('#dropdownSalas').append(salaOption)
    }
  );
}

function getInputSala(){
  $("#dropdownSalas").change(function () {
    selectedSala  = $(this).children(':selected');

    $('#salaplaceholder').focus().val(selectedSala.val())
  });
}

function getInputPelicula(){
  $("#dropdownPeliculas").change(function () {
    selectedPeli  = $(this).children(':selected');

    $('#peliplaceholder').focus().val(selectedPeli.val())
  });
}

function getInputHorario(){
  $("#dropdownHoras").change(function () {
    selectedHora  = $(this).children(':selected');

    $('#horaplaceholder').focus().val(selectedHora.val())
  });
}

function getInputFecha(){
  $("#datepicker").change(function(){
    selectedFecha = $(this).val();
    selectedFecha= selectedFecha.toString()
    $('#fechaplaceholder').focus().val(selectedFecha)
  });
}


function loadTableProyecc(){
  actualProyecciones.forEach(
    (index)=>{
      newRowTableProyec(index);
    }
  );
  getNameSalabyId()
}


function newRowTableProyec(element){
  let row = $('#tableProyecciones > tbody:last-child')
  .append(
    '<tr class="table-secondary .d-sm-flex">'+
      '<th scope="row">'+getNameSalabyId(element.sala_id)+'</th>'+
      '<td >'+getNamePelibyId(element.pelicula_id)+'</td>'+
      '<td >'+element.fecha+'</td>'+
      '<td >'+element.hora+'</td>'+
    +'</tr>'
  )
  $('#tableSalasbody').append(row)
}


function getNamePelibyId(idmovie){ 
  let foundPeli ;
  for (let i = 0;i<actualPeliculas.length;i++){
    if (actualPeliculas[i].id == idmovie){
      foundPeli = actualPeliculas[i]
      return foundPeli.nombre;
    }
  }
  return "---"

}

function getNameSalabyId(idsala){
  let foundSala = actualSalas.find(
    element => element.id == idsala
  )
  if(foundSala){
    return foundSala.nombre
  }
  return "---"

}


function render(){
  $('#fromProyecContainer').append(dropdownPeliculas)

  $('#fromProyecContainer').append(dropdownSalas)
  $('#fromProyecContainer').append(dropdownHora)
  $('#fromProyecContainer').append(calendario)
  $('#tableProyecContainer').append(tableProyecciones)

}

function renderCalendar(){
  $(function(){
    $("#datepicker").datepicker();
  });
}

function whenloaded(){
  
  render()
  loadHoras();
  getPeliculasDropdown()
  getSalasDropdown()
  getInputSala()
  getInputPelicula()
  getInputHorario()
  getInputFecha()
  renderCalendar();
  getProyecciones();
}


$(whenloaded)
