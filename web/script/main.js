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
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

updateSelectedCount();