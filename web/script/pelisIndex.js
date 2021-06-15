gridPeliculas = new Array()

var gridPeliculas = `
<div class="container" id="gridPeliculas">
  <div class="row"  id="gridPeliculasContainer">
    <!--
        <div class="col">
         Column
        </div> 
    -->
  </div>
</div>
`;


function getPeliculas(){ //from DB
    let request = new Request(url + "api/peliculas",
        { method: 'GET',headers :{} }
    );

    (async ()=>{

        const response = await fetch(request);
        if (!response.ok) {
          return;
        }
        gridPeliculas = await response.json();
        console.log(gridPeliculas)
        renderGridPeliculas()
    })();
}



function renderGridPeliculas(){
    gridPeliculas.forEach(
        (index) =>{
            newRow(index)
        }
    );

}

function newRow(pelicula){
    let row = $('<div/>',{
        id : pelicula.id,
        text: pelicula.nombre,
    })
    .addClass('col-4')


    let imageContainer = $('<img/>')
    .attr('src',url+'api/peliculas/'+pelicula.id+'/imagen')
    .attr('alt','abc')
    .addClass('icon_large img-thumbnail img-responsive w-15 p-3')
    .height('175')
    .width('175')

    row.append(imageContainer)


    $('#gridPeliculasContainer').append(row)
}





function renderAll(){
    $('#gridPelisContainer').append(gridPeliculas)
}

function whenloaded(){
    renderAll();
    getPeliculas();
}


$(whenloaded)