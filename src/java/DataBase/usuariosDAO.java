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
import usuarios.Logic.usuarios;

/**
 *
 * @author pg300
 */
public class usuariosDAO {
    public usuarios from(ResultSet rs) {
        try {
            usuarios r = new usuarios();
            r.setId(rs.getString("id"));
            r.setNombre(rs.getString("nombre"));
            r.setContrasenna(rs.getString("contrasenna"));
            r.setRol(rs.getInt("rol"));
            return r;
        } catch (SQLException ex) {
            return null;
        }
    }
    
    
    public usuarios readbyId(String id) throws Exception {
        String sqlcommand = "select * from usuarios where id = ?";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setString(1, id);
        ResultSet rs = Database.instance().executeQuery(stm);
        if (rs.next()) {
            return from(rs);
        } else {
            throw new Exception("Usuario no Existe");
        }
    }
    
    public usuarios create(usuarios cl) throws SQLException, Exception {
        String sqlcommand = "insert into Usuarios (id,nombre,contrasenna,rol)"
                + "values(?,?,?,?)";
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
        stm.setString(1, cl.getId());
        stm.setString(2, cl.getNombre());
        stm.setString(3, cl.getContrasenna());
        stm.setInt(4, cl.getRol());
        int count = Database.instance().executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Usuario ya existe");
        }
        return cl;
    }
    
    public List<usuarios>  listaClientes() throws Exception {
        String sqlcommand = "select * from Usuarios ";
          List<usuarios> clientes = Collections.synchronizedList(new ArrayList<usuarios>());
        PreparedStatement stm = Database.instance().prepareStatement(sqlcommand);
       
        ResultSet rs = Database.instance().executeQuery(stm);
      while(rs.next()){
         usuarios r= new usuarios();
            r.setId(rs.getString("id"));
            r.setNombre(rs.getString("nombre"));
            r.setContrasenna(rs.getString("contrasenna"));
            r.setRol(rs.getInt("rol"));
            clientes.add(r);

      }
      return clientes;
    }
}
