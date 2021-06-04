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
import usuarios.Logic.usuarios;

/**
 *
 * @author pg300
 */
@Path("/usuarios")
public class UsuariosR {
    String location="C:/AAA/images/";
    
       @GET
    @Path("{cedula}")
    @Produces({MediaType.APPLICATION_JSON})
    public usuarios get(@PathParam("cedula") String cedula) {
        try {
            return Service.instance().readbyidU(cedula);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
  @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<usuarios> search(@DefaultValue("") @QueryParam("nombre") String nombre) throws Exception { 
        return Service.instance().usuariosSearch(nombre);
    } 
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void addU(usuarios p) {  
        try {
            Service.instance().crearUsuario(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
}
