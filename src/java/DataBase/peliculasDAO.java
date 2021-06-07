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
import peliculas.Logic.peliculas;
import salas.Logic.sala;

/**
 *
 * @author pg300
 */
public class peliculasDAO {
    public peliculas from(ResultSet rs) {
        try {
            peliculas p = new peliculas();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setNombre(rs.getString("nombre"));
            p.setCartelera(rs.getBoolean("cartelera"));
            p.setPrecio(Double.parseDouble(rs.getString("precio")));
            return p;
        } catch (SQLException ex) {
            return null;
        }
    }
        
    
    public peliculas readbyId(int id) throws Exception {
        String sqlcommand = "select * from peliculas where id = ?";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setInt(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("Pelicula no Existe");
        }
    }
    
     public List<peliculas>  listaPeliculas() throws Exception {
        String sqlcommand = "select * from peliculas ";
          List<peliculas> peliculas = Collections.synchronizedList(new ArrayList<>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
       
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
          peliculas p = new peliculas();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setNombre(rs.getString("nombre"));
            p.setCartelera(rs.getBoolean("cartelera"));
            p.setPrecio(Double.parseDouble(rs.getString("precio")));
            peliculas.add(p);

      }
      return peliculas;
    }
    
    public peliculas create(peliculas pel) throws SQLException, Exception {
        String sqlcommand = "insert into peliculas (nombre,precio,cartelera)"
                + "values(?,?,?)";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setString(1, pel.getNombre());
        stm.setString(2, Double.toString(pel.getPrecio()));
        stm.setBoolean(3, pel.getCartelera()); 
        int count = Database.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("peliculas ya existe");
        }
        return pel;
    }
    
      public void update_cartelera(int id) throws SQLException, Exception {
        String sqlcommand = "update peliculas set cartelera=? where id=?";
        Boolean estado;
        estado = !this.readbyId(id).getCartelera();
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setBoolean(1, estado);
        stm.setInt(2, id);
        System.out.println(stm);
        Database.instance().executeUpdate(stm);
    }
}
