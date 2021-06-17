

let allTiquetes = new Array()
let allPeliculas = new Array()
let allProyecciones = new Array()
let idTiquete
let selectedTicket

let tableallTiquetesDefault = `
<table class="table mx-auto mt-3 col-md-12 " id="tableTiquetes"  style="width: 500px;">
  <thead>
    <tr class="table-secondary mx-auto">
      <th scope="col">ID</th>
      <th scope="col">Pelicula</th>
      <th scope="col">Cliente</th>
      <th scope="col">Asiento</th>
      <th scope="col">Fecha</th>
      <th scope="col"> Hora(24h) </th>

    </tr>
  </thead>
    <tbody id="tableTiquetesBody">
  </tbody>
</table>
`;






let selectTiquetes=`
  <select id="selectTiquetes">
  </select>
`


function getPeliculas(){ //from DB
  let request = new Request(url + "api/peliculas",
      { method: 'GET',headers :{} }
  );

  (async ()=>{

      const response = await fetch(request);
      if (!response.ok) {

        return;
      }
      allPeliculas = await response.json();
      getMisTiquetes();
  })();
}



function getProyecciones(){
  let request = new Request(url + "api/proyecciones",
  { method: 'GET'}
  );

  (async ()=>{
      const response = await fetch(request);
      if (!response.ok) {
          return;
      }
      
      allProyecciones = await response.json();
      console.log(allProyecciones)
      getPeliculas()
     
  })(); 
}

function clickGeneratePDF(){
  $('#downloadPDF').click(
    function(){ 
      if(checkID()){




        let tiquete = getProyecbyId(idTiquete)
        console.log(JSON.stringify(tiquete))
        let tableallTiquetesDefault2 = `
        <h4 class="mx-auto mt-2 col-md-12" style="user-select: auto;" >Tiquete comprado</h4>

        <table class="table mx-auto mt-3 col-md-12 " id="tableTiquetes"  style="width: 500px;">
          <thead>
            <tr class="table-secondary mx-auto">
              <th scope="col">ID</th>
              <th scope="col">Pelicula</th>
              <th scope="col">Cliente</th>
              <th scope="col">Asiento</th>
              <th scope="col">Fecha</th>
              <th scope="col"> Hora(24h) </th>

            </tr>
          </thead>
            <tbody id="tableTiquetesBody">`+
            `<tr class="table-secondary .d-sm-flex"`+`id=`+`"`+ tiquete.id+`"`+`>`+
            `<th scope="row">`+selectedTicket.id+`</th>`+
            `<td>`+getNamePelibyId(selectedTicket.id_proyeccion)+`</td>` +
            `<td>`+selectedTicket.id_cliente +`</td>` +
            `<td>`+selectedTicket.asiento +`</td>` + 
            `<td>`+getProyecbyId(selectedTicket.id_proyeccion).fecha +`</td>` + 
            `<td>`+getProyecbyId(selectedTicket.id_proyeccion).hora +`</td>` + 
            `</tr>`

            +`</tbody>
        </table>
        `;



        const element = tableallTiquetesDefault2;
        html2pdf().set({
          pagebreak: {mode: 'css' }
        });
        html2pdf(element)

      }
      else{
        console.log('error ID')
      } 
    }
  );
}

function checkID(){
  if(idTiquete > '0' && idTiquete < allTiquetes.length){
    return true;
  }
  return false;
}


function getMisTiquetes(){


    let request = new Request(url + "api/tiquetescComprados/",
      {method: 'GET', headers: { }}
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {

          return;
        }
        allTiquetes = await response.json();
        renderTable()
        
    })();
}

function renderTable(){
  allTiquetes.forEach(
        (index) =>{
          newRowTable(index);
          newRowList(index);
        }
    );
}

function newRowTable(element){
  console.log(JSON.stringify(element))
    let row = $('#tableTiquetes > tbody:last-child')
    .append('<tr class="table-secondary .d-sm-flex"'+'id='+'"'+ element.id+'"'+'>'+
        '<th scope="row">'+element.id+'</th>'+
        '<td>'+getNamePelibyId(element.id_proyeccion)+'</td>' +
        '<td>'+element.id_cliente +'</td>' +
        '<td>'+element.asiento +'</td>' + 
        '<td>'+getProyecbyId(element.id_proyeccion).fecha +'</td>' + 
        '<td>'+getProyecbyId(element.id_proyeccion).hora +'</td>' + 
        '</tr>'
    )
  $('#tableSalasbody').append(row)
}



function getProyecbyId(idproyec){
  let proyeccion = allProyecciones.find(
    element => element.id == idproyec
  )
  return (proyeccion)
}


function getNamePelibyId(idproyec){ 
  var proyeccion = getProyecbyId(idproyec)

  for (let index = 0; index < allPeliculas.length; index++) {

    if(allPeliculas[index].id == proyeccion.pelicula_id){
      return allPeliculas[index].nombre
    }
    
  }
  return "---"

}

function newRowList(tiquete){
    let option = $('<option>',{
      text: tiquete.id,
      id: tiquete.id,
      
      
  })
  $('#selectTiquetes').append(option)
}

function render(){
  $('#tiquetesContainer').append(tableallTiquetesDefault)
  $('#listTiquetesContainer').append(selectTiquetes)

}


function clickSelect(){//selecciona el id del tiquete de la list
  $('#listTiquetesContainer').change(function(){ 
    idTiquete = $(this).text();
    
    idTiquete =  $( "#listTiquetesContainer option:selected" ).text();
    selectedTicket = allTiquetes.find(
      (element) => element.id == idTiquete
    )
    $('#tiqueteplaceholder').focus().val(idTiquete)
    $('#selected').text(idTiquete)
    
  });
}




function whenloaded(){
  clickSelect()
  render()
  getProyecciones()
  clickGeneratePDF()
}

$(whenloaded)
