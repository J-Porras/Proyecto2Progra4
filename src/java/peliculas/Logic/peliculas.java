/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package peliculas.Logic;

/**
 *
 * @author pg300
 */
public class peliculas {
    private int id;
    private String nombre;
    private Double precio;
    private Boolean cartelera;

    public peliculas() {
    }

    public peliculas(int id, String nombre, Double precio, Boolean cartelera) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cartelera = cartelera;
    }

    public Boolean getCartelera() {
        return cartelera;
    }

    public void setCartelera(Boolean cartelera) {
        this.cartelera = cartelera;
    }

    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
    
}
