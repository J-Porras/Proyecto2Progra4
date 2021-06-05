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
import peliculas.Logic.peliculas;


/**
 *
 * @author pg300
 */
@Path("/peliculas")
public class PeliculasR {
     String location="C:/AAA/images/";
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public peliculas get(@PathParam("id") String id) {
        try {
            return Service.instance().readbyidP(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<peliculas> search(@DefaultValue("") @QueryParam("nombre") String nombre) throws Exception { 
        return Service.instance().peliculasSearch(nombre);
    } 
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void addU(peliculas p) {  
        try {
            Service.instance().crearPelicula(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
