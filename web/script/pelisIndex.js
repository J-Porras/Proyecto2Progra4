gridPeliculas = new Array()
gridSalas = new Array()
allProyecciones = new Array()//todas
gridProyecciones = new Array()//de la pelicula seleccionada


var gridPeliculasDefault = `
<div class="container" id="gridPeliculas">
  <div class="row"  id="gridPeliculasContainer">
    <!--
        <div class="col">
         Column
        </div> 
    -->
  </div>
</div>
`;


var dropdownAllMovies=`
  <select id="dropdownMoviesContainer">
  </select>
`

//limpia la table de proyecciones
function cleanModalTableProyec(){
    $('#closeBtnModal').click(
        function(){
            
            $('#modalProyecPeliculas tbody tr').remove()
            gridProyecciones.length = 0
        }
    );
}



function getPeliculas(){ //from DB
    let request = new Request(url + "api/peliculas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {
          return;
        }
        gridPeliculas = await response.json(); 
        renderGridPeliculas();

    })();
}


function getSalas(){

    let request = new Request(url + "api/salas",
        { method: 'GET',headers :{} }
    );
    (async ()=>{
      const response = await fetch(request);
      if (!response.ok) {
  
        return;
      }
  
      gridSalas = await response.json();

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
      allProyecciones = await response.json();

    })();
}


//guarda solo las peliculas que estan en cartelera
function filterMovies(){

}

function getProyeccionesbyPeli(idmovie){
    gridProyecciones = allProyecciones.filter(
        element => element.pelicula_id == idmovie
    )
}

function getNameSalabyId_(idsala){
    for (let index = 0; index < gridSalas.length; index++) {
        if(gridSalas[index].id == idsala){
            return gridSalas[index].nombre;
        }
    }
    return '---'

}

//renderiza las proyecciones del Modal
function renderModalProyec(idmovie){
    getProyeccionesbyPeli(idmovie)


    for (let index = 0; index < gridProyecciones.length; index++) {
        newRowModalProyec(gridProyecciones[index])     
    }
}

function newRowModalProyec(element){
    let row = $('#tableProyecPeli > tbody:last-child')
    .append(
        '<tr class="table-secondary .d-sm-flex">'+
        '<th scope="row">'+getNameSalabyId_((element.sala_id).toString())+'</th>'+
        '<td >'+element.fecha+'</td>'+
        '<td >'+element.hora+'</td>'+
        +'</tr>'
    )
  $('#tableProyecPeliBody').append(row)
}



/////////////RENDERS

//renderiza las peliculas en Index
function renderGridPeliculas(idmovie){
    
    gridPeliculas.forEach(
        (pelicula) =>{
            newRowGrid(pelicula)
        }
    );

}

function newRowGrid(pelicula){

    let nombreContainer = $('<div/>',{
        text: pelicula.nombre,
    })
    .attr('type', 'text')
    .addClass('fs-4 fw-normal')


    let row = $('<div/>',{
        id : 'RowPeli'+pelicula.id,
        
    })
    .addClass('col-4')


    let imageContainer = $('<img/>')
    .attr('src',url+'api/peliculas/'+pelicula.id+'/imagen')
    .attr('alt','abc')
    .addClass('icon_large img-thumbnail img-responsive w-15 p-3')
    .height('175')
    .width('175')

    let buttonContainer = $('<div/>')

    let buttonModal = $('<button/>',{
        text : 'Ver Proyecciones',
        id: 'PeliBtn'+pelicula.id
    })
    .click(
        function(){ 
            renderModalProyec(pelicula.id)
        }
    )
    .addClass("btn btn-primary" )
    .attr('data-bs-toggle','modal')
    .attr('data-bs-target','#modalProyecPeliculas')
    .click()
    
    
    buttonContainer.append(buttonModal)


    row.append(nombreContainer)
    row.append(imageContainer)
    row.append(buttonContainer)


    $('#gridPeliculasContainer').append(row)
}


function renderDropdownCartelera(){
    gridPeliculas.forEach(
        (movie) =>{
            newOptionDropdown(movie)
        }
    )
}

function newOptionDropdown(element){
    let option = $('<option>',{
        text: element.nombre +" "+"($"+element.precio+")",
        id:element.id
    })
    $('#dropdownMoviesContainer').append(option)

}





function renderAll(){
    $('#gridPelisContainer').append(gridPeliculasDefault)
}

function whenloaded(){
    cleanModalTableProyec();
    renderAll();
    getPeliculas();
    getSalas();
    getProyecciones();  
    
}


$(whenloaded)