/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DataBase;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import proyecciones.Logic.proyeccion;
import tiquetesComprados.Logic.tiqueteComprado;


/**
 *
 * @author pg300
 */
public class proyeccionesDAO {
     public proyeccion from(ResultSet rs) {
        try {
            proyeccion p = new proyeccion();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setSala_id(rs.getInt("sala_id"));
            p.setHora(rs.getString("hora"));
             p.setHora(rs.getString("hora"));
            p.setPelicula_id(rs.getInt("pelicula_id"));
            return p;
        } catch (SQLException ex) {
            return null;
        }
    }
        
    
    public proyeccion  readbyId(int id) throws Exception {
        String sqlcommand = "select * from proyecciones where id = ?";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setInt(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("Proyeccion no Existe");
        }
    }
    
     public List<proyeccion>  proyeccion_porPelicula(int id) throws Exception {
        String sqlcommand = "select * from proyecciones where pelicula_id = ?";
          List<proyeccion> proyeccion_pelicula = Collections.synchronizedList(new ArrayList<proyeccion>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setInt(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
          proyeccion p = new proyeccion();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setSala_id(rs.getInt("sala_id"));
            p.setHora(rs.getString("hora"));
            p.setFecha(rs.getString("fecha"));
            p.setPelicula_id(rs.getInt("pelicula_id"));
            proyeccion_pelicula.add(p);

      }
      return proyeccion_pelicula;
    }
     public List<proyeccion>  listaProyecciones() throws Exception {
        String sqlcommand = "select * from proyecciones ";
          List<proyeccion> proyecciones = Collections.synchronizedList(new ArrayList<proyeccion>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
       
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
            proyeccion p = new proyeccion();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setSala_id(rs.getInt("sala_id"));
            p.setHora(rs.getString("hora"));
             p.setFecha(rs.getString("fecha"));
            p.setPelicula_id(rs.getInt("pelicula_id"));
           
            proyecciones.add(p);

      }
      return proyecciones;
    }
    public proyeccion create(proyeccion pel) throws SQLException, Exception {
        String sqlcommand = "insert into proyecciones (sala_id,fecha,hora,pelicula_id)"
                + "values(?,?,?,?)";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setInt(1, pel.getSala_id());
        stm.setString(2, pel.getFecha());
        stm.setString(3, pel.getHora());
        stm.setInt(4, pel.getPelicula_id());
        System.out.println("Sala ID:"+pel.getSala_id()+"Fecha"+pel.getFecha()+
                "Hora:"+pel.getHora()+"Peli ID:"+pel.getPelicula_id());
        int count = Database.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Proyeccion ya existe");
        }
        return pel;
    }
}
