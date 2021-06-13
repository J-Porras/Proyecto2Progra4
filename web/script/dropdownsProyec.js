var actualPeliculas = new Array()
var actualSalas = new Array()


var selectedPeli;
var selectedHora;
var selectedSala;


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
  let currentoption
  $("#dropdownSalas").change(function () {
    currentoption  = $(this).children(':selected');

    $('#salaplaceholder').focus().val(currentoption.val())
  });
}

function getInputPelicula(){
  let currentoption
  $("#dropdownPeliculas").change(function () {
    currentoption  = $(this).children(':selected');

    $('#peliplaceholder').focus().val(currentoption.val())
  });
}

function getInputHorario(){
  let currentoption
  $("#dropdownHoras").change(function () {
    currentoption  = $(this).children(':selected');

    $('#horaplaceholder').focus().val(currentoption.val())
  });
}

function getInputFecha(){
  $("#datepicker").change(function(){
    var selected = $(this).val();
    selected.toString()
    $('#fechaplaceholder').focus().val(selected)
  });
}



function render(){
  $('#fromProyecContainer').append(dropdownPeliculas)

  $('#fromProyecContainer').append(dropdownSalas)
  $('#fromProyecContainer').append(dropdownHora)
  $('#fromProyecContainer').append(calendario)


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
  
}


$(whenloaded)
