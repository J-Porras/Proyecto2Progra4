package presentation;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

@ApplicationPath("api")
public class RegistroApplication extends Application{
       @Override
    public Set<Class<?>> getClasses() {

        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(MultiPartFeature.class);
        System.out.println("added multipart feature");
        classes.add(PeliculasR.class);
        classes.add(SalasR.class);
        classes.add(UsuariosR.class);
        classes.add(TiquetesCompradosR.class);
        classes.add(ProyeccionesR.class);
        return classes;
    }   
}
