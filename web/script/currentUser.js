class User{
    constructor(actual_user){
        this.actual_user = actual_user;
    }


    setUser(){
        this.actual_user = JSON.parse(localStorage.getItem('usuario_actual'))
    }
    cleanUser(){
        this.actual_user = undefined;
    }

    getUser(){
        return this.actual_user;
    }

    getRol(){
        if (this.actual_user)
            return this.actual_user.rol;
        return undefined;
    }

    getID(){
        if (this.actual_user)
            return this.actual_user.id;
        return undefined;
    }

    isAnonUser(){
        if(!this.actual_user){
            return true
        }
            
        return false;
    }




}