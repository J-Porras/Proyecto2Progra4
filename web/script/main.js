url = "http://localhost:8080/Proyecto2Progra4/";
var current_user = {contrasenna:"-",id:"-",nombre:"-",rol:"-1"};
//id,nombre,contra,rol



const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('dropdownCarteleraContainer'); //movie
const peliculas = document.getElementById('movies'); //movies

////////////////////////
const rowsSeatsCantidad = 6;
const columnsSeatsCantidad = 8; 


/////////////////////////////

var current_title = $(document).attr('title');

if(current_title == 'Cinema24+1'){
  // Cargando peliculas (cambiar por alguna funcion o por lo trabajado por el backend)
  /*i = 0;
  while(i<2){
    var div = document.createElement("div");

    div.classList.add("mov-container");

    var img = document. createElement("img");
    img.classList.add('poster');

    img.setAttribute('src','images/pelicula.jpg');
    
    var descripcion = document.createElement("div");
    descripcion.appendChild(document.createTextNode("afdsfasfadsfasdfasdfaiiadsbfijadsbifbasdijfiajsdbfjiabsdiufbasuidfb iufbadsiubfiuasdbfiusadbfuisdb sssssssskdsa nfldsknfosadknfoadsnfoikasdnfonasdokfa sd faidsnf óa{s kjfokasfosifoisdnfoiasdsssssssfasdfasdfasdfasdfasdfasdfDescripcion: "+ i));
    descripcion.classList.add('descripcion');
    descripcion.setAttribute("value",i);
    div.appendChild(descripcion);
    div.appendChild(img);
    peliculas.appendChild(div);
    i+=1;
  }*/
  populateUI();

  let ticketPrice = +movieSelect.value;

  function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', (movieIndex));
    localStorage.setItem('selectedMoviePrice', (moviePrice));
  }

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

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }


  //pone el precio final de los billetes
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

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }

  movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
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



/////////////////////////////////////

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




function clickLogin(){

  $('#btnLogin').click(
    function(){
      console.log('click login')

      login();
    }
  );
}

//cerrar sesion
function clickLogout(){
  
  localStorage.removeItem('usuario_actual');
  document.location = url;
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


//registrar
function clickRegister(){

  $('#btnRegister').click(
    function(){
      register();
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

  console.log('Usuario a mandar '+current_user)

  let request = new Request(url + "api/usuarios/login",
    {method: 'POST',headers :{'Content-Type': 'application/json'},
    body: JSON.stringify(current_user)}
  );




  (async () =>{


    const response = await fetch(request);
    console.log('Response:'+response)

    if(!response.ok){
      console.log('Bad response')

      //falta modal para erorres o con bootstrap o un alert
      return;
    }
    current_user = await response.json();

    console.log('Good response')

    localStorage.setItem('usuario_actual', JSON.stringify(current_user));
    console.log(current_user)
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
      alert('error Register')
      //falta modal para erorres o con bootstrap o un alert
      return;
    }
    alert('Usuario registrado exitosamente')


    //los valores del objeto de JS debe estar en el mismo orden que en la clase de Java sino muere
  })();


}



/*el fetch and list en nuestro caso devuelve la lista de proyecciones
para insertarlas en las salas, es lo primero que hace el browser 

function fetchAndList(){
  let request = new Request(url+'api/usuarios', 
    {method: 'GET', headers: { }}
  );
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
        personas = await response.json();
        list();              
    })();
}*/





function whenloaded(){
  
  clickLogin();
  clickRegister();
  clickNuevaSala();
  clickNuevaPeli();
  clickNuevaProyec();
  clickTiquetes()

  openForm();
  closeForm();
  openFormRegister();
  closeFormRegister();

  generateSeats();

}

$(whenloaded);