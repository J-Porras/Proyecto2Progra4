url = "http://localhost:8080/Proyecto2Progra4/";
var current_user = {contrasenna:"-",id:"-",nombre:"-",rol:"-1"};
//id,nombre,contra,rol



const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const peliculas = document.getElementById('movies');


// Cargando peliculas (cambiar por alguna funcion o por lo trabajado por el backend)
i = 0;
while(i<10){
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
}
populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', (movieIndex));
  localStorage.setItem('selectedMoviePrice', (moviePrice));
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) =>{
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
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

//Formulario de Login
function openForm() {
  //document.getElementById("myForm").style.display = "block";
  $('#toggleLogin').click(
    
    function(){
      console.log('aa')
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
      login();
    }
  );
}


//formulario de  register

function openFormRegister() {
  $('#toggleRegister').click(
    
    function(){
      console.log('Modal Register')
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



//cerrar sesion
function clickLogout(){
  
  localStorage.removeItem('usuario_actual');
  alert('Sesion cerrada')
  location.reload();

}

//envia al url de nuea Sala
function clickNuevaSala(){
  
  $('#registrarSalasBtn').click(
    function(){
      console.log('nueva sala')
      document.location = url + "registrarSala.html";
    }
  );

}





//iniciar sesion
function login(){


  current_user.id =  $('#idlogin').val();
  current_user.contrasenna = $('#contrasena').val();

  console.log(current_user)

  let request = new Request(url + "api/usuarios/login",
    {method: 'POST',headers :{'Content-Type': 'application/json'},
    body: JSON.stringify(current_user)}
  );

  console.log('saliendo de request');

  (async () =>{
    console.log('Async()');

    const response = await fetch(request);

    if(!response.ok){
      console.log('error login')
      //falta modal para erorres o con bootstrap o un alert
      return;
    }
    console.log('nice');
    current_user = await response.json();
    console.log(current_user);
    //console.log(current_user)
    localStorage.setItem('usuario_actual', JSON.stringify(current_user));
    //los valores del objeto de JS debe estar en el mismo orden que en la clase de Java sino muere
  })();
}

function register(){

  console.log('INSIDE REGISTER')

  let new_user = {contrasenna:"-",id:"-",nombre:"-",rol:"1"};//nuevo usuario es normie
  new_user.nombre = $('#nombreregister').val();
  new_user.id = $('#idregister').val();
  new_user.contrasenna = $('#contrasenaregister').val();


  console.log('SENDING REQUEST ' + JSON.stringify(new_user))

  let request = new Request(url + 'api/usuarios',
  {method: 'POST',headers :{'Content-Type': 'application/json'},
  body: JSON.stringify(new_user)}
  );

  (async () =>{
    console.log('Async()');

    const response = await fetch(request);

    if(!response.ok){
      console.log('error Register')
      //falta modal para erorres o con bootstrap o un alert
      return;
    }
    console.log('nice register');
    alert('Usuario registrado exitosamente')
    //console.log(current_user)
    //los valores del objeto de JS debe estar en el mismo orden que en la clase de Java sino muere
  })();


}


function newSala(){
  var nombreSala = $('#nuevasalanombre')
  var salas = getSalasForm();//todas las salas
  salas.forEach(
    (element) =>{
      if(nombreSalaValido(element,nombreSala)){
        alert('Nueva Sala creada FALTA DEVOLVERLA')
      }
      else{
        alert('Nombre de Sala no valido')
      }
    }

  )

}



function getSalasForm(){//retorna las salas del ul en formato JS array
  var salas =  $(".dropdown-item").map(function() {
    return this.innerHTML;
  }).get();
}

function nombreSalaValido(sala,nombre){
  if(sala.text === nombre){
    return false

  }
  return true  
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




updateSelectedCount();

function whenloaded(){
  
  clickLogin();
  clickRegister();
  clickNuevaSala();

  openForm();
  closeForm();
  openFormRegister();
  closeFormRegister();

  newSala();
}

$(whenloaded);