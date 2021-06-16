url = "http://localhost:8080/Proyecto2Progra4/";


var current_title = $(document).attr('title');

var current_user = {contrasenna:"-",id:"-",nombre:"-",rol:"-1"};

var user = new User();
user.setUser()
console.log(user)

var selectedMovie
var selectedMoviePrice = 0
var ticketPrice = 0
var selectedProyec
//id,nombre,contra,rol


var cantidadSeats = document.getElementById('count');

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const total = document.getElementById('total');
const movieSelect = document.getElementById('dropdownCarteleraContainer'); //movie
const peliculas = document.getElementById('movies'); //movies

////////////////////////
const rowsSeatsCantidad = 6;
const columnsSeatsCantidad = 8; 


/////////////////////////////


if(current_title == 'Cinema24+1'){

  populateUI();

  ticketPrice = +movieSelect.value;

  function updateSelectedCount() {
    //devuelve una list de seat que estan selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(
      (seat) =>
      {
        //return [...seats].indexOf(seat)
        return seat.id;
      }

    )

    localStorage.setItem('selected_seats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    //pone el precio final de los billetes
    cantidadSeats.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * selectedMoviePrice;
  }


  //pone cuales estan disponibles y cuales no (asientos)
  function populateUI() {
    console.log('Populate UI')
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }

  }

  movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
  })


  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')
    ) {
      e.target.classList.toggle('selected');

      updateSelectedCount()
    }
  })

  updateSelectedCount();



  ///////////
  
  $('#dropdownCarteleraContainer').change(function(){ 
    var value = $(this).text();
    value =  $( "#dropdownCarteleraContainer option:selected" ).text();
    setselectedProyeccion(value)
  });
  



}//fin if


//generando los asientos visualmente y las columnas
function generateSeats(){
  let singleSeat;


  for (let rows = 0; rows < rowsSeatsCantidad; rows++) {
    let rowSeats = $('<div/>')
    .addClass('row')

    for (let columns = 0, numAsiento = 1; columns < columnsSeatsCantidad; columns++,numAsiento++) {
      singleSeat = $('<div/>',{
        id: ((rows+10).toString(36)).toUpperCase() + numAsiento
      })
      .addClass('seat')

      rowSeats.append(singleSeat)
    }

    $('#seatsContainer').append(rowSeats)
  }//fin for rows

}

function setSelectedMovie(themovie){
  selectedMovie = themovie
  localStorage.setItem('selected_movie',JSON.stringify(themovie))
}


function setselectedProyeccion(proyec){
  selectedProyec = proyec
  localStorage.setItem('selected_proyec',JSON.stringify(selectedProyec))
}

/////////////////////////////////////


function canBuyTicket(){
  let themovie = JSON.parse(localStorage.getItem('selected_movie'))
  let theproyeccion = JSON.parse(localStorage.getItem('selected_proyec'))
  let theuser = JSON.parse(localStorage.getItem('usuario_actual'))
  let asientos = JSON.parse(localStorage.getItem('selected_seats'))
  if(jQuery.isEmptyObject(themovie) || jQuery.isEmptyObject(theproyeccion)
    || jQuery.isEmptyObject(theuser)| jQuery.isEmptyObject(asientos))
    {
      return false
    }
    return true
}

function isAdmin(){
  return user.getRol() == '1'
}




//////////////

//Formulario de Login
function openForm() {
  //document.getElementById("myForm").style.display = "block";
  $('#toggleLogin').click(
    
    function(){
      $('#FormLogin').show();
    }

  );
}



function closeForm() {
  $('#closeFormLogin').click(
    function(){
      $('#FormLogin').hide();
    }
  );
}


//Clicks




function clickProyecModal(){
  $('#selecProyecBtn').click(
    function(){
      localStorage.setItem('selected_movie',selectedMovie)
    }
  )
}



function clickLogin(){

  $('#btnLogin').click(
    function(){

      login();
    }
  );
}

//cerrar sesion
function clickLogout(){
  
  localStorage.removeItem('usuario_actual');
  user.cleanUser()
  document.location = url;
}

//registrar
function clickRegister(){

  $('#btnRegister').click(
    function(){
      register();
    }
  );
}


//formulario de  register

function openFormRegister() {
  $('#toggleRegister').click(
    
    function(){
      $('#FormRegister').show();
    }

  );
}

function closeFormRegister() {
  $('#closeFormRegister').click(
    function(){
      $('#FormRegister').hide();
    }
  );
}







//envia al url de nueva Sala
function clickNuevaSala(){
  
  $('#registrarSalasBtn').click(
    function(){

      document.location = url + "registrarSala.html";
    }
  );

}


//envia al url de nueva Pelicula
function clickNuevaPeli(){
  
  $('#peliculasBtn').click(
    function(){
      document.location = url + "registrarPeli.html";
    }
  );

}

//envia al url de nueva Proyec
function clickNuevaProyec(){
  
  $('#proyecionBtn').click(
    function(){
      document.location = url + "nuevaProyec.html";
    }
  );

}

function clickTiquetes(){
  
  $('#MispeliculasBtn').click(
    function(){
      document.location = url + "misTiquetes.html";
    }
  );

}

//iniciar sesion
function login(){


  current_user.id =  $('#idlogin').val();
  current_user.contrasenna = $('#contrasena').val();


  let request = new Request(url + "api/usuarios/login",
    {method: 'POST',headers :{'Content-Type': 'application/json'},
    body: JSON.stringify(current_user)}
  );



  (async () =>{


    const response = await fetch(request);

    if(!response.ok){
      //falta modal para erorres o con bootstrap o un alert
      return;
    }
    current_user = await response.json();


    localStorage.setItem('usuario_actual', JSON.stringify(current_user));
    user.setUser();

    location.reload()

    //los valores del objeto de JS debe estar en el mismo orden que en la clase de Java sino muere
  })();
}


function register(){



  let new_user = {contrasenna:"-",id:"-",nombre:"-",rol:"1"};//nuevo usuario es normie
  new_user.nombre = $('#nombreregister').val();
  new_user.id = $('#idregister').val();
  new_user.contrasenna = $('#contrasenaregister').val();

  let request = new Request(url + 'api/usuarios',
  {method: 'POST',headers :{'Content-Type': 'application/json'},
  body: JSON.stringify(new_user)}
  );

  (async () =>{


    const response = await fetch(request);

    if(!response.ok){
      console.log('error Register')
      //falta modal para erorres o con bootstrap o un alert
      return;
    }
    alert('Usuario registrado exitosamente')


    //los valores del objeto de JS debe estar en el mismo orden que en la clase de Java sino muere
  })();


}

function whenloaded(){
  
  clickLogin();
  clickRegister();
  clickNuevaSala();
  clickNuevaPeli();
  clickNuevaProyec();
  clickTiquetes();
  clickProyecModal();
  isAdmin();


  openForm();
  closeForm();
  openFormRegister();
  closeFormRegister();

  generateSeats();

}

$(whenloaded);