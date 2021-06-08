/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var defaultNavBar = 
        `<nav class="navbar navbar-expand-lg navbar-dark " style="background-color: #234790;">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Cinema 24+1</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  <button type="button" class="btn btn-primary"  id="toggleLogin">Iniciar Sesion</button>  
                </div>`;

            `</div>
            </div>
        </nav>`
;



function changeNavBar(){
  const navbar = document.getElementById('navbarNavAltMarkup');

  console.log(localStorage.getItem('usuario_actual'))
  //creando boton de logout
  if(localStorage.getItem('usuario_actual')){//si hay usuario
    var logoutBtn = $('<button/>',{
      text : 'Cerrar Sesion',
      id : 'logoutBtn',

    })
    .click(clickLogout)
    .addClass('btn btn-primary mr-1')
    .attr('type', 'text');
    
    $('#navbarNavAltMarkup').append(logoutBtn);
    
    $('#toggleLogin').hide();
    let rol_actual = JSON.parse(localStorage.getItem('usuario_actual')).rol

    console.log('Rol actual' + rol_actual)



    switch (rol_actual) {
        case 0:// admin //
            console.log('inside swithc')
            var salasBtn = $('<button/>',{
                text : 'Registrar Salas',
                id : 'salasBtn',
        
            })
            .addClass('btn btn-primary .mx-auto')
            .attr('type', 'text');
            
            $('#navbarNavAltMarkup').append(salasBtn);

            var peliculasBtn = $('<button/>',{
                text : 'Agregar Peliculas',
                id : 'peliculasBtn',
        
            })
            .addClass('btn btn-primary .mx-auto')
            .attr('type', 'text');
            
            $('#navbarNavAltMarkup').append(peliculasBtn);

            var proyecionBtn = $('<button/>',{
                text : 'Nueva Proyeccion',
                id : 'proyecionBtn',
        
            })
            .addClass('btn btn-primary .mx-auto')

            .attr('type', 'text');
            
            $('#navbarNavAltMarkup').append(proyecionBtn);

            
        break;

        case 1://normies


        break;
    

        default:
            break;
    }
    
    

  }
  else{
    var logoutBtn = $('#logoutBtn');
    if (logoutBtn){ //si no hay usuario y el boton de logOut anda por ahi
      $('#logoutBtn').hide()
      $('#toggleLogin').show();

    }
  }
    
    
}


function loadMenu(){
    $('body').prepend(defaultNavBar); 
    changeNavBar();
  }
  
  $(loadMenu);  