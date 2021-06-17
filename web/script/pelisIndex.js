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
 
    $('#modalProyecPeliculas tbody tr').remove()
    $('#dropdownCarteleraContainer option').remove()
    $('#closeBtnModal').click(
        function(){
            $('#modalProyecPeliculas tbody tr').remove()
            

            gridProyecciones.length = 0
            selectedMoviePrice = 0
            selectedMovie = 0
            cantidadSeats = 0
            ticketPrice = 0
            $('#dropdownCarteleraContainer option').remove()
        }
    );
}


function clickComprarTiquetes(){
    $('#buyBtnModal').click(
      function(){
        if(canBuyTicket()){
            let allSeats = JSON.parse(localStorage.getItem('selected_seats'))
            let newTicket = {id:0,id_proyeccion:0,id_cliente:"",asiento:""}

            if (allSeats.length>1){//hay que mandar varios tiquetes

                for (let index = 0; index < allSeats.length; index++) {
                    const element = allSeats[index];

                    newTicket.id_proyeccion = parseInt(selectedMovie.id);
                    newTicket.id_cliente = current_user.id;
                    newTicket.asiento = element;


                    

                    let request = new Request(url + "api/tiquetescComprados",
                      {method: 'POST',headers :{'Content-Type': 'application/json'},
                        body: JSON.stringify(newTicket)}
                    );

                    const response = fetch(request);
                    if(!response.ok){
                        console.log('Bad response')
                        //falta modal para erorres o con bootstrap o un alert
                    }

                    
                }
            }
            else{
                newTicket.id_proyeccion = parseInt(selectedMovie.id);
                newTicket.id_cliente = current_user.id;
                newTicket.asiento = element;

                let request = new Request(url + "api/tiquetescComprados",
                      {method: 'POST',headers :{'Content-Type': 'application/json'},
                        body: JSON.stringify(current_user)}
                    );

                    const response = fetch(request);
                    if(!response.ok){
                        console.log('Bad response')
                        //falta modal para erorres o con bootstrap o un alert
                    }

            }
  
        }
        else{
            console.log(JSON.parse(localStorage.getItem('selected_seats')))
            console.log('No se pueden comprar tiquetes')
        }
  
        
      }
    )
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
    gridProyecciones = new Array;
    for (let index = 0; index < allProyecciones.length; index++) {
        if(allProyecciones[index].pelicula_id == idmovie){
            gridProyecciones.push(allProyecciones[index])
        }
        
    }

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
    gridProyecciones.forEach(
        (element)=>{
            newRowModalProyec(element)  
            newOptionDropdown(element) 
        }

    )
}



//row de la tabla del modal
function newRowModalProyec(element){


    let row = $('#tableProyecPeli > tbody:last-child')
    .append(
        '<tr class="table-secondary .d-sm-flex">'+
        '<td scope="row">'+element.id+'</td>'+

        '<th >'+getNameSalabyId_((element.sala_id).toString())+'</th>'+
        '<td >'+element.fecha+'</td>'+
        '<td >'+element.hora+'</td>'+

        '</td>'+'</tr>'
    )
    console.log('NEW ROW')

    
    
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
            selectedMovie = pelicula
            selectedMoviePrice = pelicula.precio
            localStorage.setItem('selected_movie',JSON.stringify(selectedMovie))
            localStorage.setItem('selectedMoviePrice',JSON.stringify(selectedMoviePrice))
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

function getMovieProve(idmovie){
    movie = gridPeliculas.find(
        element => element.id == idmovie
    )
    return movie.precio
}

function newOptionDropdown(proyeccion){
    let option = $('<option>',{
        text: proyeccion.id,
        id:proyeccion.id,
        value: getMovieProve((proyeccion.pelicula_id).toString()),
        
    })
    $('#dropdownCarteleraContainer').append(option)

}





function renderAll(){
    $('#dropdownMovieContainer').append(dropdownAllMovies)
    $('#gridPelisContainer').append(gridPeliculasDefault)
}

function whenloaded(){

    cleanModalTableProyec();
    clickComprarTiquetes();
    renderAll();
    getPeliculas();
    getSalas();
    getProyecciones();  
    
}


$(whenloaded)