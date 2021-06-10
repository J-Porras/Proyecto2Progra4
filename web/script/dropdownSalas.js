var defaultDropdown = `
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownSalas" data-bs-toggle="dropdown" aria-expanded="false">
    Salas creadas

  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownSalas">
    <li><class="dropdown-item">Prueba</li>
  </ul>
</div>


`;

var salas = new Array();


function getSalas(){
    let request = new Request(url + "api/salas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {
            return
        }
        salas = await response.json();

    })();
}



function changeDropdown(){
    //const dropdownMenu = document.getElementById('dropdownSalas');

    var index = 0;

    salas.forEach(
        (element)=>{
            var row = $('<li/>',{
                text : element.nombre,
                id : 'sala' + index,
            })
            .addClass('dropdown-item')

            $('.dropdown-menu').append(row);
            index++;

        }
    );
}

function loadDropdown(){
    $('#containersalas').prepend(defaultDropdown); 
    getSalas();
    changeDropdown();

}

$(loadDropdown);