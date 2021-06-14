/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package presentation;

import Data.Service.logic.Service;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import proyecciones.Logic.proyeccion;
import org.glassfish.jersey.media.multipart.FormDataParam;

/**
 *
 * @author pg300
 */
    @Path("/proyecciones")
public class ProyeccionesR {
     String location="C:/images/";
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public proyeccion get(@PathParam("id") int id) {
        try {
            
            return Service.instance().readbyidPr(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<proyeccion> search(@DefaultValue("0") @QueryParam("id_pelicula") String id_pelicula) throws Exception { 
        int id= Integer.parseInt(id_pelicula);
        return Service.instance().proyeccionSearchPelicula(id);
    } 
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void addProyeccion(proyeccion p) {  
        try {
            Service.instance().crearProyecion(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
