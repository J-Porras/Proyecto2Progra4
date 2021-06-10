var url = "http://localhost:8080/Proyecto2Progra4/";
var salas = new Array();
const table = document.getElementById('tableSalas');

function getAllSalas(){

}


var defaultTable = `

<table class="mx-auto table align-middle" id="tableSalas">
  <thead>
    <tr class="table-secondary mx-auto">
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
    </tr>
  </thead>
    <tbody id="tableSalasbody">
  </tbody>
</table>

`;


function getSalas(){
    let request = new Request(url + "api/salas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{


        const response = await fetch(request);
        if (!response.ok) {

          return;
        }



        salas = await response.json();
        changeDropdown();


    })();
}



function changeDropdown(){
  salas.forEach(
    (index)=>{
      newRow(index);
    }
       
  );
}


function newRow(element){
  var row = $('#tableSalas > tbody:last-child')
  .append('<tr class="table-secondary .d-sm-flex">'+
    '<th scope="row">'+element.id+'</th>'+
    '<td >'+element.nombre+'</td>'
    +'</tr>')
  $('#tableSalasbody').append(row)
}

function loadDropdown(){
  $('body').append(defaultTable); 
  getSalas();

}

$(loadDropdown);