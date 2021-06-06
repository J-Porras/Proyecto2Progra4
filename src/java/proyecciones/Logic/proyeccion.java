/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyecciones.Logic;

/**
 *
 * @author pg300
 */
public class proyeccion {
   private int id;
   private int sala_id;
   private String fecha;
   private String hora;
   private int pelicula_id;

    public proyeccion() {
    }

    public proyeccion(int id, int sala_id, String fecha, String hora, int pelicula_id) {
        this.id = id;
        this.sala_id = sala_id;
        this.fecha = fecha;
        this.hora = hora;
        this.pelicula_id = pelicula_id;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSala_id() {
        return sala_id;
    }

    public void setSala_id(int sala_id) {
        this.sala_id = sala_id;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public int getPelicula_id() {
        return pelicula_id;
    }

    public void setPelicula_id(int pelicula_id) {
        this.pelicula_id = pelicula_id;
    }
   
    
}
