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
import tiquetesComprados.Logic.tiqueteComprado;

/**
 *
 * @author pg300
 */
@Path("/tiquetescComprados")
public class TiquetesCompradosR {
     String location="C:/AAA/images/";
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public tiqueteComprado get(@PathParam("id") int id) {
        try {
            return Service.instance().readbyidTc(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<tiqueteComprado> search(@DefaultValue("") @QueryParam("id_cliente") String id_cliente) throws Exception { 
       
        return Service.instance().tiqueteCompradoSearchCliente(id_cliente);
    } 
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
    public void addU(tiqueteComprado p) {  
        try {
            Service.instance().crearTiquetesComprados(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
}
