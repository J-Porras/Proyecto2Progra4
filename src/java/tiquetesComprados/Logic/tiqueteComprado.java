/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tiquetesComprados.Logic;

/**
 *
 * @author pg300
 */
public class tiqueteComprado {
    private int id;
    private int id_proyeccion;
    private String id_cliente;
    private String asiento;

    public tiqueteComprado() {
    }

    public tiqueteComprado(int id, int id_proyeccion, String id_cliente, String asiento) {
        this.id = id;
        this.id_proyeccion = id_proyeccion;
        this.id_cliente = id_cliente;
        this.asiento = asiento;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_proyeccion() {
        return id_proyeccion;
    }

    public void setId_proyeccion(int id_proyeccion) {
        this.id_proyeccion = id_proyeccion;
    }

    public String getId_cliente() {
        return id_cliente;
    }

    public void setId_cliente(String id_cliente) {
        this.id_cliente = id_cliente;
    }

    public String getAsiento() {
        return asiento;
    }

    public void setAsiento(String asiento) {
        this.asiento = asiento;
    }
    
}
