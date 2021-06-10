var url = "http://localhost:8080/Proyecto2Progra4/";
var salas = new Array();
const table = document.getElementById('tableSalas');


var defaultTable = `

<table class="table" id="tableSalas">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
    </tr>
  </thead>
    <tbody id="tableSalasbody">
  </tbody>
</table>`;


function getSalas(){
    console.log('request Salas')
    let request = new Request(url + "api/salas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{


        const response = await fetch(request);
        if (!response.ok) {

          return;
        }



        salas = await response.json();
        console.log('Salas en request: ' + salas)

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
  .append('<tr>'+
    '<th scope="row">'+element.id+'</th>'+
    '<td>'+element.nombre+'</td>'
    +'</tr>')
  $('#tableSalasbody').append(row)
}

function loadDropdown(){
  $('body').append(defaultTable); 
  getSalas();

}

$(loadDropdown);