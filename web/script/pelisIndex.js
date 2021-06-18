gridPeliculas = new Array()
gridSalas = new Array()
allProyecciones = new Array()//todas
gridProyecciones = new Array()//de la pelicula seleccionada
allTiquetes = new Array()
peliculasCartelera = new Array()
var filterOn;
var filterMovies_ = new Array()

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


            localStorage.removeItem('selected_seats')

            $('#dropdownCarteleraContainer option').remove()
        }
    );
}


function clickComprarTiquetes(){
    $('#buyBtnModal').click(
      function(){

        if(canBuyTicket()){
            let allSeats = JSON.parse(localStorage.getItem('selected_seats'))
            let newTicket = {asiento:"",id:"-1",id_cliente:"",id_proyeccion:"-1"}

            for (let index = 0; index < allSeats.length; index++) {
                const element = allSeats[index];

                newTicket.id_proyeccion = selectedProyec
                newTicket.id_cliente = user.getID()
                newTicket.asiento = element;


                let request = new Request(url + "api/tiquetescComprados",
                  {method: 'POST',headers :{'Content-Type': 'application/json'},
                    body: JSON.stringify(newTicket)}
                );

                const response = fetch(request);
                if(!response.ok){
                    console.log('Bad response')
                    //falta modal para erorres o con bootstrap o un x
                }
                generatePDF(newTicket)
                getTicketsProyec(JSON.parse(localStorage.getItem('selected_proyec')))
                
                
            }
  
        }
        else{
            console.log(JSON.parse(localStorage.getItem('selected_seats')))
            console.log('No se pueden comprar tiquetes')
        }
        
      }
    )
}


function clickComprarAnon(){
    $('#buyBtnModal2').click(
        function(){
            if(user.isAnonUser()){
                

                let new_user_anon = {contrasenna:"-",id:"-",nombre:"-",rol:"-1"};
                new_user_anon.contrasenna = '1234'
                new_user_anon.id =  $('#idAnon').val()
                new_user_anon.nombre = $('#nombreAnon').val()
                new_user_anon.rol = "1"

                console.log('new User'+new_user_anon)
                


                let request = new Request(url + 'api/usuarios',
                {method: 'POST',headers :{'Content-Type': 'application/json'},
                body: JSON.stringify(new_user_anon)}
                );

                (async () =>{


                    const response = await fetch(request);

                    if(!response.ok){
                        console.log('error Register')
                    //falta modal para erorres o con bootstrap o un alert
                    return;
                    }
                    sendTicketAnon();


                    //los valores del objeto de JS debe estar en el mismo orden que en la clase de Java sino muere
                })();

                

            }//else error compra de tiquetes     

        }
    )
}

function sendTicketAnon(){
    
        let allSeats = JSON.parse(localStorage.getItem('selected_seats'))
        let newTicketAnon = {asiento:"",id:"-1",id_cliente:"",id_proyeccion:"-1"}

        for (let index = 0; index < allSeats.length; index++) {
            const element = allSeats[index];

            newTicketAnon.id_proyeccion = selectedProyec
            newTicketAnon.id_cliente = $('#idAnon').val()
            newTicketAnon.asiento = element;


            let request = new Request(url + "api/tiquetescComprados",
                {method: 'POST',headers :{'Content-Type': 'application/json'},
                 body: JSON.stringify(newTicketAnon)}
            );

                const response = fetch(request);
            if(!response.ok){
                console.log('Bad response')
                //falta modal para erorres o con bootstrap o un x
            }
            generatePDF(newTicketAnon)
            getTicketsProyec(JSON.parse(localStorage.getItem('selected_proyec')))
                
        }
}

function generatePDF(ticket){
    let ticketRow = `
        <h4 class="mx-auto mt-2 col-md-12" style="user-select: auto;" >Tiquete comprado</h4>

        <table class="table mx-auto mt-3 col-md-12 " id="tableTiquetes"  style="width: 500px;">
          <thead>
            <tr class="table-secondary mx-auto">
              <th scope="col">Pelicula</th>
              <th scope="col">Cliente ID</th>
              <th scope="col">Asiento</th>
              <th scope="col">Fecha</th>
              <th scope="col"> Hora(24h) </th>
            </tr>
          </thead>
            <tbody id="tableTiquetesBody">`+
            `<tr class="table-secondary .d-sm-flex"`+`>`+
            `<th scope="row">`+getNamePelibyId_(ticket.id_proyeccion)+`</th>`+
            `<td>`+ticket.id_cliente+`</td>` +
            `<td>`+ticket.asiento +`</td>` +
   
            `<td>`+getProyecbyId_(ticket.id_proyeccion).fecha +`</td>` + 
            `<td>`+getProyecbyId_(ticket.id_proyeccion).hora +`</td>` + 
            `</tr>`

            +`</tbody>
        </table>
    `;

    const element = ticketRow;
        html2pdf().set({
          pagebreak: {mode: 'css' }
        });
        html2pdf(element)
        alert('Tiquets comprado')

}


function getProyecbyId_(idproyec){
    let proyeccion = allProyecciones.find(
      element => element.id == idproyec
    )
    return (proyeccion)
}


function getNamePelibyId_(idproyeccion){ 
    let proyecionFound = allProyecciones.find(
        element => element.id == idproyeccion
    )

    for (let index = 0; index < gridPeliculas.length; index++) {

        if(gridPeliculas[index].id == proyecionFound.pelicula_id){
          return gridPeliculas[index].nombre
        }
        
      }
  
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
        filterMovies();
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

function getallTiquetes(){


    let request = new Request(url + "api/tiquetescComprados/",
      {method: 'GET', headers: { }}
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        allTiquetes = await response.json();
        
    })();
}



//guarda solo las peliculas que estan en cartelera
function filterMovies(){
    peliculasCartelera = gridPeliculas.filter(
        (element) => element.cartelera == true
    )


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

    
    
  $('#tableProyecPeliBody').append(row)
}



/////////////RENDERS

//renderiza las peliculas en Index
function renderGridPeliculas(){
    
    peliculasCartelera.forEach(
        (pelicula) =>{
            newRowGrid(pelicula)
        }
    );

}

function renderGridPeliculasFilter(){
    filterMovies_ = JSON.parse(localStorage.getItem('filterMovies'))
    filterMovies_.forEach(
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
            $('#modalProyecPeliculas tbody tr').remove()
            $('#dropdownCarteleraContainer option').remove()
            $('#seatsContainer').html('');

            selectedMovie = pelicula
            selectedMoviePrice = pelicula.precio
            
            localStorage.setItem('selected_movie',JSON.stringify(selectedMovie))
            localStorage.setItem('selectedMoviePrice',JSON.stringify(selectedMoviePrice))
            renderModalProyec(pelicula.id)
        }
    )
    .addClass("btn btn-primary w-70 p-1 mt-1" )
    .attr('data-bs-toggle','modal')
    .attr('data-bs-target','#modalProyecPeliculas')
    .click()
    
    
    buttonContainer.append(buttonModal)


    row.append(nombreContainer)
    row.append(imageContainer)
    row.append(buttonContainer)


    $('#gridPeliculasContainer').append(row)
}

function clickFIlterMovies(){
    $('#searchPeliIndex').click(
      function(){
        namePart = $('#nomPeliString').val()  
        for (let index = 0; index < gridPeliculas.length; index++) {
            const element = gridPeliculas[index];



            if(((element.nombre).toUpperCase()).includes(namePart.toUpperCase())){
                if(element.cartelera){
                    filterMovies_.push(element)
                }
                
            }
        }
        peliculasCartelera = filterMovies_
        console.log(JSON.stringify(peliculasCartelera))
        localStorage.setItem('filter',JSON.stringify(true))
        localStorage.setItem('filterMovies',JSON.stringify(filterMovies_))
        

      }
    );

}

function renderDropdownCartelera(){
    let optionempty = $('<option>',{
        text: 'NA',
        id:0,
        value: '0',
        
    })
    $('#dropdownCarteleraContainer').append(optionempty)

    gridPeliculas.forEach(
        (movie,index) =>{
           
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
    clickComprarAnon();
    clickFIlterMovies();
    renderAll();
    getPeliculas();
    getSalas();
    getProyecciones();  
    
}

function loadFilter(){
    console.log('adasdas')
    renderAll();
    cleanModalTableProyec();
    clickComprarTiquetes();
    clickComprarAnon();
    clickFIlterMovies();
    renderGridPeliculasFilter();
}

if(JSON.parse(localStorage.getItem('filter'))){
    console.log('ON')

    
    localStorage.setItem('filter',JSON.stringify(false))
    $(loadFilter)
}
else{
    console.log('OFF')

    $(whenloaded)
    localStorage.setItem('filter',JSON.stringify(false))

}



