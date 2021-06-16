/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package usuarios.Logic;

/**
 *
 * @author pg300
 */
public class usuarios {
    private String id;
    private String nombre;
    private String contrasenna;
    private int rol;

    public usuarios(String id, String nombre, String contrasenna, int rol) {
        this.id = id;
        this.nombre = nombre;
        this.contrasenna = contrasenna;
        this.rol = rol;
    }

    public usuarios() {
    }
    
    public void cleanPassword(){
        this.contrasenna = "-";
    }

    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContrasenna() {
        return contrasenna;
    }

    public void setContrasenna(String contrasenna) {
        this.contrasenna = contrasenna;
    }

    public int getRol() {
        return rol;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }
    
}
