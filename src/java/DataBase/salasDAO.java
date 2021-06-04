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
import salas.Logic.sala;

/**
 *
 * @author pg300
 */
public class salasDAO {
    public sala from(ResultSet rs) {
        try {
            sala p = new sala();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setNombre(rs.getString("nombre"));
            return p;
        } catch (SQLException ex) {
            return null;
        }
    }
    
    public sala readbyId(String id) throws Exception {
        String sqlcommand = "select * from salas where id = ?";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setString(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("Sala no Existe");
        }
    }
    
    public List<sala>  listaSalas() throws Exception {
        String sqlcommand = "select * from salas ";
          List<sala> salas = Collections.synchronizedList(new ArrayList<sala>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
       
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
           sala p = new sala();
            p.setId(Integer.parseInt(rs.getString("id")));
            p.setNombre(rs.getString("nombre"));
            salas.add(p);

      }
      return salas;
    }
     
    public sala create(sala sala) throws SQLException, Exception {
        String sqlcommand = "insert into salas (id,nombre)"
                + "values(?,?)";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setString(1,Integer.toString(sala.getId()));
        stm.setString(2, sala.getNombre());
        int count = Database.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Usuario ya existe");
        }
        return sala;
    }
}
