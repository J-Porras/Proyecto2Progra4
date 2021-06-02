/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Data.Service.logic;

import DataBase.peliculasDAO;
import DataBase.salasDAO;
import DataBase.usuariosDAO;
import java.util.logging.Level;
import java.util.logging.Logger;
import peliculas.Logic.peliculas;
import salas.Logic.sala;
import usuarios.Logic.usuarios;

/**
 *
 * @author pg300
 */
public class Service {
    private peliculasDAO peliculasDAO;
    private usuariosDAO usuariosDAO;
    private salasDAO salasDAO;
    private static Service theInstance;
    
    
    public static Service instance() {
        if (theInstance == null) {
            theInstance = new Service();
        }
        return theInstance;
    }

    public Service() {
        this.peliculasDAO = new peliculasDAO();
        this.usuariosDAO = new usuariosDAO();
        this.salasDAO = new salasDAO();
    }
    
    
    /////////////////////////////////usuarios
    
    public usuarios crearUsuario(usuarios u){
        usuarios result = null;
        
        try {
            result = usuariosDAO.create(u);
        } catch (Exception ex) {
            Logger.getLogger(Service.class.getName()).log(Level.SEVERE, null, ex);
        }
            return result;
    }
    
    public usuarios login(usuarios u){
        usuarios result = null;

        try {
            result = usuariosDAO.readbyId(u.getId());
        } catch (Exception ex) {
            Logger.getLogger(Service.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        
        if (result == null ||
                (!result.getContrasenna().equals(u.getContrasenna())))
        {
            return null;
        }
        return result;
        
    }
    
    ///////////////////Peliculas
    
    public peliculas crearPelicula(peliculas peli){
        peliculas result = null;
        
        try {
            result = peliculasDAO.create(peli);
            
            
        } catch (Exception ex) {
            Logger.getLogger(Service.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
        return result;
        
    }
    
    /////////////////////////salas
    
    public sala crearSala(sala s){
        sala result = null;
        
        try {
            result = salasDAO.create(s);
        } catch (Exception ex) {
            Logger.getLogger(Service.class.getName()).log(Level.SEVERE, null, ex);
            return result;
        }
        return result;
    }
    
    
}
