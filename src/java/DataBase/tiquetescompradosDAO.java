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
import tiquetesComprados.Logic.tiqueteComprado;


/**
 *
 * @author pg300
 */
public class tiquetescompradosDAO {
     public tiqueteComprado from(ResultSet rs) {
        try {
            tiqueteComprado p = new tiqueteComprado();
            p.setId(rs.getInt("id"));
            p.setAsiento(rs.getString("asiento"));
            p.setId_cliente(rs.getString("id_cliente"));
            p.setId_proyeccion(rs.getInt("id_proyeccion"));
  
            return p;
        } catch (SQLException ex) {
            return null;
        }
    }
        
    
    public tiqueteComprado  readbyId(int id) throws Exception {
        String sqlcommand = "select * from tiquetesComprados where id = ?";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);//Crashea Glassfish
        stm.setInt(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("Proyeccion no Existe");
        }
    }
      public List<tiqueteComprado>  asientos_ocupados_porProyeccion(int id) throws Exception {
        String sqlcommand = "select * from tiquetesComprados where id_proyeccion = ?";
          List<tiqueteComprado> asientos_ocupados = Collections.synchronizedList(new ArrayList<tiqueteComprado>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);//Crashea Glassfish
        stm.setInt(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
          tiqueteComprado p = new tiqueteComprado();
            p.setId(rs.getInt("id"));
            p.setAsiento(rs.getString("asiento"));
            p.setId_cliente(rs.getString("id_cliente"));
            p.setId_proyeccion(rs.getInt("id_proyeccion"));
            asientos_ocupados.add(p);

      }
      return asientos_ocupados;
    }
    //falta tiquetes por usaurios
       public List<tiqueteComprado>  proyeccion_cliente(String id) throws Exception {
        String sqlcommand = "select * from tiquetesComprados where id_cliente = ?";
          List<tiqueteComprado> asientos_cliente = Collections.synchronizedList(new ArrayList<tiqueteComprado>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);//Crashea Glassfish
        stm.setString(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
          tiqueteComprado p = new tiqueteComprado();
            p.setId(rs.getInt("id"));
            p.setAsiento(rs.getString("asiento"));
            p.setId_cliente(rs.getString("id_cliente"));
            p.setId_proyeccion(rs.getInt("id_proyeccion"));
            asientos_cliente.add(p);

      }
      return asientos_cliente;
    }
    public tiqueteComprado create(tiqueteComprado pel) throws SQLException, Exception {
        String sqlcommand = "insert into tiquetesComprados (id_proyeccion,id_cliente,asiento)"
                + "values(?,?,?)";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setInt(1, pel.getId_proyeccion());
        stm.setString(2, pel.getId_cliente());
        stm.setString(3, pel.getAsiento());
        int count = Database.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Proyeccion ya existe");
        }
        return pel;
    }
}
