/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package presentation;

import Data.Service.logic.Service;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.glassfish.jersey.media.multipart.FormDataParam;




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
    public peliculas get(@PathParam("id") int id) {
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
    
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void update(@PathParam("id") int id) {  
        try {
            Service.instance().updateCartelera(id);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    
    @GET
    @Path("{id}/image")
    @Produces("image/png")
    public Response getImge(@PathParam("id") String id) throws IOException {
        File file = new File(location+id);
        ResponseBuilder response = Response.ok((Object) file);
        return response.build();
    }   
    
    @POST
    @Path("{id}/image")
    @Consumes(MediaType.MULTIPART_FORM_DATA) 
    
    public void addImge(@PathParam("id") String id, @FormDataParam("image") InputStream imagenStream) {  
        
        try{
            int read = 0;
            byte[] bytes = new byte[1024];

            OutputStream out = new FileOutputStream(new File(location + id));
            while ((read = imagenStream.read(bytes)) != -1){out.write(bytes, 0, read);}
            out.flush();
            out.close();
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
 
    }
}
