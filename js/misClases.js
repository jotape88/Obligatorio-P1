class Chef {
    constructor() {
        this.Id;
        this.Usuario;
        this.Contraseña;
        this.Recetas = new Array();
        this.Deshabilitado = false;
    }
}



class Receta {
    constructor() {
        this.Id;
        this.Autor; 
        this.Titulo;
        this.Foto;
        this.Tiempo = 0;
        this.Elaboracion;
        this.CantidadMg = 0;
        this.CantidadNmg = 0;
    }

}
