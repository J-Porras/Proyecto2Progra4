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
//  document.getElementById("myForm").style.display = "none";
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
  alert('Sesion cerrada')
  loadNavbar();
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


//nav bar cambia si hay un usuario conectado
function loadNavbar(){
  const navbar = document.getElementById('navbar');

  console.log(localStorage.getItem('usuario_actual'))
  //creando boton de logout
  if(localStorage.getItem('usuario_actual')){//si hay usuario
    var logoutBtn = $('<button/>',{
      text : 'Cerrar Sesion',
      id : 'logoutBtn',

    })
    .click(clickLogout)
    .addClass('open-button')

    $('#navbar').append(logoutBtn);
    $('#toggleLogin').hide();
  }
  else{
    var logoutBtn = $('#logoutBtn');
    if (logoutBtn){ //si no hay usuario y el boton de logOut anda por ahi
      $('#logoutBtn').hide()
      $('#toggleLogin').show();

    }
  }
    
    
}

function reloadPage(){
  location.reload()
  reload = reload - 1;
}



updateSelectedCount();

function whenloaded(){
  
  clickLogin();
  loadNavbar();
  openForm();
  closeForm();
}

$(whenloaded);