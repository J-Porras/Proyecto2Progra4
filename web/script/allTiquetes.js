

let allTiquetes = new Array()
let allPeliculas = new Array()
let allProyecciones = new Array()
let idTiquete

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
      console.log('asdasdadasd')
      if(checkID()){
        console.log('true')
        const element = document.getElementById(idTiquete);
        html2pdf(element).set({
          pagebreak: {mode: 'css' }
        });
      }
      else{
        console.log('false')
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
        console.log("tiquetes:"+allTiquetes)
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
