/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var defaultNavBar = 
        `<nav class="navbar navbar-expand-lg navbar-dark " style="background-color: #234790;">
            <div class="container-fluid">
              <a class="navbar-brand" href="http://localhost:8080/Proyecto2Progra4/">Cinema 24+1</a>
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
  //creando boton de logout
  if(localStorage.getItem('usuario_actual')){//si hay usuario

    let rol_actual = JSON.parse(localStorage.getItem('usuario_actual')).rol
    

    var logoutBtn = $('<button/>',{
      text : 'Cerrar Sesion',
      id : 'logoutBtn',

    })
    .click(clickLogout)
    .addClass('btn btn-primary mr-1')
    .attr('type', 'text');
    
    $('#navbarNavAltMarkup').append(logoutBtn);
    
    $('#toggleLogin').hide();



    
    let registertoggleButton = $('registerBtn').hide();

    if (registertoggleButton) { // si hay un usuario oculta el boton de register
      $('registerBtn').hide();
    }
    




    switch (rol_actual) {
        case 0:// admin //
            var salasBtn = $('<button/>',{
                text : 'Registrar Salas',
                id : 'registrarSalasBtn',
        
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
    if (logoutBtn){ //si no hay usuario y el boton de logout anda por ahi
      $('#logoutBtn').hide()
      $('#toggleLogin').show();



    //boton de register
    var registerBtn = $('<button/>',{
      text : 'Registrarse',
      id : 'toggleRegister',
    })
    
    .addClass('btn btn-primary .mx-auto')
    .attr('type', 'text');
    $('#navbarNavAltMarkup').append(registerBtn);




    }//fin if
  }
    
    
}


function loadMenu(){
    $('body').prepend(defaultNavBar); 
    changeNavBar();
  }
  
  $(loadMenu);  