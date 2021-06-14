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
     String location="C:/images/";
    

  
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<tiqueteComprado> search(@DefaultValue("0") @QueryParam("id_proyecciones") String id_proyecciones) throws Exception { 
        int id= Integer.parseInt(id_proyecciones);
        return Service.instance().AsientosOcupados(id);
    } 
    @GET
    @Path("{id_proyecciones}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<tiqueteComprado> searchOcupados(@DefaultValue("0") @PathParam("id_proyecciones") String id_proyecciones) throws Exception { 
        int id= Integer.parseInt(id_proyecciones);
        return Service.instance().AsientosOcupados(id);
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
