/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package presentation;

import Data.Service.logic.Service;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
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
@Path("/tiquetes")
public class MisTiquetesR {
    
   
  
      @GET
      @Path("{id_cliente}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<tiqueteComprado> searchC(@DefaultValue("") @PathParam("id_cliente") String id_cliente) throws Exception { 
       
        return Service.instance().tiqueteCompradoSearchCliente(id_cliente);
    } 
       @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<tiqueteComprado> search(@DefaultValue("") @QueryParam("id_cliente") String id_cliente) throws Exception { 
       
        return Service.instance().tiqueteCompradoSearchCliente(id_cliente);
    } 
}
