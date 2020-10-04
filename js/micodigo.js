$(document).ready(ejecutarMICodigo);

function ejecutarMICodigo() {
    // OCULTAMOS CUANDO CARGA LA PÁGINA
    ocultarGral();

    // Muestra precargas.
    preCargaChefs();
    preCargaRecetas();

    // EVENTOS CLICKS
    $("#btnIniciar").click(iniciarSesion);
    $("#btnAgregarReceta2").click(agregarRecetaHTML);
    $("#btnRegistrarColab").click(agregarColabHTML);
    $("#btnBuscarReceta").click(busquedaDeRecetas);
    $("#btnTiempoReportes").click(reportesTiempo);
    $("#btnMaximoReportes").click(reportesMaximo);
    $("#btnPorcentajeReportes").click(reportesPorcentaje);
    $("#LiCerrarSesion").click(cerrarSesion);

    // EVENTOS PARA MOSTRAR.
    $("#btnAgregarReceta").click(mostrarBotonAgregarReceta);
    $("#btnAgregarColab").click(mostrarBotonAgregarColab);
    $("#LiIniciarSesion").click(mostrarIniciarSesion);
    $("#btnListarColaboradores").click(mostrarBotonListarColaboradores);
    $("#btnReportes").click(mostrarBotonReportes);

    // MUESTRA TODOS LOS DATOS Y LOS ORDENA.
    ordenRecetas();
    mostrarTodo(chefs);
}




//identificadores únicos incrementados.
let idReceta = 0;
let idChef = 0;


//listas globales de almacenamiento
//Creamos solo array global de Chefs, porque las recetas se encuentran dentro de cada chef.
let chefs = new Array();




// COLOCAMOS ** PARA DIVIDIR POR SECCIONES.

















//**FUNCIONES PARA OCULTAR Y MOSTRAR.


// OCULTAR GENERAL
function ocultarGral() {

    //Ocultamos todos los botones.
    ocultarBotonesAlInicio();

    //Ocultamos las funcionalidades que no deben estar al inicio de la aplicación.
    ocultarFuncionalidades();

    // Ocultamos cerrar sesión.
    $("#LiCerrarSesion").hide();
}


//OCULTAMOS TODOS LOS BOTONES AL INICIO DE LA APP A TRAVÉS DE CLASES.
function ocultarBotonesAlInicio() {
    $(".administrador").hide();
    $(".adminColab").hide();
}


//OCULTAMOS TODAS LAS FUNCIONALIDADES AL INICIO DE LA APP A TRAVÉS DE CLASES.
function ocultarFuncionalidades() {
    $(".funcionalidades").hide();
}







// MOSTAR Y OCULTAR FUNCIONALIDADES.



function mostrarBotonAgregarReceta() {
    //Oculto funcionalidades primero y muestro la funcionalidad de agregar recetas.
    ocultarFuncionalidades();
    $("#divIngresoRecetas").show();

    //Vaciamos el div que muestra las notificaciones en el ingreso de recetas para cuando cambiamos de botón.
    //Cuando volvemos a presionar el botón de agregar receta el div se vacia.
    $("#divNotificacionesIngReceta").empty();

    //Limpiamos caja de texto y notificaciones.
    limpiarBusquedaDeRecetas();

    //Mostramos todas las recetas.
    mostrarTodo(chefs);
}



function mostrarBotonAgregarColab() {
    //Oculto funcionalidades primero y muestro la funcionalidad de agregar colaboradores.
    ocultarFuncionalidades();
    $("#divIngresoColaboradores").show();

    //Vaciamos el div que muestra las notificaciones en el ingreso de colaboradores para cuando cambiamos de botón.
    //Cuando volvemos a presionar el botón de agregar colaborador el div se vacia.
    $("#divNotificacionesIngColaboradores").empty();

    //Limpiamos caja de texto y notificaciones.
    limpiarBusquedaDeRecetas();

    //Mostramos todas las recetas.
    mostrarTodo(chefs);
}



function mostrarBotonListarColaboradores() {
    //Oculto funcionalidades primero y muestro la funcionalidad de listar colaboradores.
    ocultarFuncionalidades();

    //Llamo a "listarColaboradores" que arma la lista en "divListarColaboradores".
    listarColaboradores();
    $("#divListadoDeColaboradores").show();


    //Vaciamos el div que muestra las notificaciones en el listado de colaboradores para cuando cambiamos de botón.
    //Cuando volvemos a presionar el botón de listar colaborador el div se vacia.
    $("#divNotificaciones").empty();

    //Limpiamos caja de texto y notificaciones.
    limpiarBusquedaDeRecetas();

    //Mostramos todas las recetas.
    mostrarTodo(chefs);
}


function mostrarBotonReportes() {
    //Oculto funcionalidades primero y muestro la funcionalidad reportes.
    ocultarFuncionalidades();
    $("#divReportes").show();


    //Vaciamos la caja de texto que muestra el tiempo en los reportes para cuando cambiamos de botón.
    //Cuando volvemos a presionar el botón de reportes la caja de texto se vacia.
    $("#txtTiempoReportes").val("");

    //Limpiamos caja de texto y notificaciones.
    limpiarBusquedaDeRecetas();

    //Mostramos todas las recetas.
    mostrarTodo(chefs);
}





//A travéz de una bandera mostramos y ocultamos la funcionalidad "Iniciar sesión".

// INICIAR SESIÓN
let seMuestraIS = false;
function mostrarIniciarSesion() {
    // Si la bandera tiene el valor false no se muestra la funcionalidad.
    // Al clickear mostramos la funcionalidad y cambiamos el valor de la bandera a true
    // Esto causa que al vovler a clickear se oculte la funcionalidad a travéz de "ocultarIniciarSesion()"
    // y se vuelva a cambiar el valor de la bandera a false.
    if (seMuestraIS === false) {
        $("#divMostrarIniciarSesion").show();
        seMuestraIS = true;
    } else {
        ocultarIniciarSesion();
        seMuestraIS = false;
    }
}

function ocultarIniciarSesion() {
    $("#divMostrarIniciarSesion").hide();
}


function limpiarBusquedaDeRecetas() {
    $("#divNotificacionesBusqueda").empty(); //Limpiamos las notificaciones.
    $("#txtBuscarReceta").val(""); //Limpiamos la caja de texto.
}








//** PRECARGA.
// CREAR CHEFS Y RECETAS.

function preCargaChefs() {

    // Creamos 5 colaboradores.
    crearChef("Ana", "Alvez");
    crearChef("Benito", "Perez");
    crearChef("Andrea", "Alvez");
    crearChef("Camila", "Martinez");
    crearChef("Carmen", "Martinez");


    //A travéz de la funcion "obtenerChefXUsuario" obtenemos el objeto colaborador a partir de su usuario.
    let unChef1 = obtenerChefXUsuario("aalvez");
    let unChef2 = obtenerChefXUsuario("bperez");
    if (unChef1 !== null || unChef2 !== null) {
        unChef1.Deshabilitado = true; //Habilitamos al colaborador "aalvez"
        unChef2.Deshabilitado = true; //Habilitamos al colaborador "bperez"
    } else {
        console.warn("No se encontro el/los chef por usuario");
    }




    // ADMINISTRADOR.
    // Creamos al administrador a travéz de la clase Chef.
    // Agregamos al administrador a la lista global de chefs.
    let admin = new Chef();
    admin.Id = idChef;
    admin.Usuario = `chef`;
    admin.Contraseña = `chef-01`;
    chefs.push(admin);
    idChef++;

}



function preCargaRecetas() {

    //A travéz de la funcion "obtenerChefXUsuario" obtenemos el objeto colaborador a partir de su usuario.
    //Agregamos varias recetas pasandole a la función "crearRecetaEnChefOAutor" por parámetro sus propiedades individuales.

    let unChef1 = obtenerChefXUsuario("aalvez");
    crearRecetaEnChefOAutor(unChef1, "Pollo", "Foto0.jpg", "60", `Salpimentamos los filetes de pechuga, los extendemos y disponemos sobre éstos un par de cucharadas del relleno de espinacas.`);

    let unChef2 = obtenerChefXUsuario("bperez");
    crearRecetaEnChefOAutor(unChef2, "Hamburguesa", "Foto1.jpg", "61", `Con un molde para hamburguesas ir armando las hamburguesas, tratando de que todas tengan el mismo grosor.`);

    let unChef3 = obtenerChefXUsuario("aalvez1");
    crearRecetaEnChefOAutor(unChef3, "Panqueques", "Foto2.jpg", "62", `Cocinar de un lado, dar vuelta y cocinar unos segundos más. Retirar y volcar sobre un plato. Continuar hasta terminar la mezcla, apilando las crepes.`);

    //Agregamos por Id de receta, los Mg y los no Mg deseados en la precarga.
    agregarMGyNMg(2, 1, 3);

    let unChef4 = obtenerChefXUsuario("cmartinez");
    crearRecetaEnChefOAutor(unChef4, "Arroz con camarones", "Foto3.jpg", "64", `Pica ambos ingredientes finamente antes de cocinarlos. Cuando la cebolla empiece a ponerse transparente añade el arroz y mezcla todo junto.`);

    let unChef5 = obtenerChefXUsuario("cmartinez1");
    crearRecetaEnChefOAutor(unChef5, "Donas glaseadas", "Foto4.jpg", "66", `Reservar las donas cortadas sobre una bandeja forrada. Freír en abundante aceite hasta que se doren y poner a escurrir en papel absorbente.`);

    let unChef0 = obtenerChefXUsuario("chef");
    crearRecetaEnChefOAutor(unChef0, "Camarones", "Foto5.jpg", "67", `Agrega a un sartén el resto de mantequilla y fríe los camarones rellenos. Termina de cocinar por 3 a 5 minutos hasta que estén cocidos.`);

    //Agregamos por Id de receta, los Mg y los no Mg deseados en la precarga.
    agregarMGyNMg(5, 0, 8);

    let unChef6 = obtenerChefXUsuario("chef");
    crearRecetaEnChefOAutor(unChef6, "Panchos", "Foto6.jpg", "63", `Coloca los panchos en la plancha y cocinalos hasta que se calienten durante aproximadamente 10 minutos. Retiralos a una bandeja.`);

    let unChef7 = obtenerChefXUsuario("chef");
    crearRecetaEnChefOAutor(unChef7, "Sushi", "Foto7.jpg", "90", `Después de enjuaguarlo lo dejamos reposar unos 30 minutos. Ponemos el arroz y el agua en una olla y la tapamos.`);

    let unChef8 = obtenerChefXUsuario("chef");
    crearRecetaEnChefOAutor(unChef8, "Brochettes", "Foto8.jpg", "91", `Entonces insertamos intercalando un trozo de carne, otro de cebolla, otro de carne, otro de pimiento.`);

    let unChef9 = obtenerChefXUsuario("bperez");
    crearRecetaEnChefOAutor(unChef9, "Ñoquis", "Foto9.jpg", "91", `Hervir suficiente agua en una olla y colocar los ñoquis hasta que floten dejar por unos minutos y retirar del agua, servir con la salsa que gustes`);

    let unChef10 = obtenerChefXUsuario("aalvez1");
    crearRecetaEnChefOAutor(unChef10, "Hamburguesa", "Foto10.jpg", "91", `Con un molde para hamburguesas ir armando las hamburguesas, tratando de que todas tengan el mismo grosor.`);

    //Agregamos por Id de receta, los Mg y los no Mg deseados en la precarga.
    agregarMGyNMg(10, 2, 10);

    let unChef11 = obtenerChefXUsuario("aalvez");
    crearRecetaEnChefOAutor(unChef11, "Panqueques", "Foto11.jpg", "100", `Cocinar de un lado, dar vuelta y cocinar unos segundos más. Retirar y volcar sobre un plato. Continuar hasta terminar la mezcla, apilando las crepes.`);

    let unChef12 = obtenerChefXUsuario("aalvez1");
    crearRecetaEnChefOAutor(unChef12, "Arroz con camarones", "Foto12.jpg", "101", `Pica ambos ingredientes finamente antes de cocinarlos. Cuando la cebolla empiece a ponerse transparente añade el arroz y mezcla todo junto.`);

    let unChef13 = obtenerChefXUsuario("aalvez");
    crearRecetaEnChefOAutor(unChef13, "Donas glaseadas", "Foto13.jpg", "90", `Reservar las donas cortadas sobre una bandeja forrada. Freír en abundante aceite hasta que se doren y poner a escurrir en papel absorbente.`);

    let unChef14 = obtenerChefXUsuario("cmartinez1");
    crearRecetaEnChefOAutor(unChef14, "Camarones", "Foto14.jpg", "70", `Agrega a un sartén el resto de mantequilla y fríe los camarones rellenos. Termina de cocinar por 3 a 5 minutos hasta que estén cocidos.`);

    //Agregamos por Id de receta, los Mg y los no Mg deseados en la precarga.
    agregarMGyNMg(14, 9, 4);

    let unChef15 = obtenerChefXUsuario("cmartinez1");
    crearRecetaEnChefOAutor(unChef15, "Panchos", "Foto15.jpg", "70", `Coloca los panchos en la plancha y cocinalos hasta que se calienten durante aproximadamente 10 minutos. Retiralos a una bandeja.`);

    let unChef16 = obtenerChefXUsuario("cmartinez1");
    crearRecetaEnChefOAutor(unChef16, "Sushi", "Foto16.jpg", "70", `Después de enjuaguarlo lo dejamos reposar unos 30 minutos. Ponemos el arroz y el agua en una olla y la tapamos.`);

    //Agregamos por Id de receta, los Mg y los no Mg deseados en la precarga.
    agregarMGyNMg(16, 5, 7);

    let unChef17 = obtenerChefXUsuario("cmartinez");
    crearRecetaEnChefOAutor(unChef17, "Brochettes", "Foto17.jpg", "73", `Entonces insertamos intercalando un trozo de carne, otro de cebolla, otro de carne, otro de pimiento.`);

    //Agregamos por Id de receta, los Mg y los no Mg deseados en la precarga.
    agregarMGyNMg(17, 5, 2);

    let unChef18 = obtenerChefXUsuario("cmartinez");
    crearRecetaEnChefOAutor(unChef18, "Ñoquis", "Foto18.jpg", "89", `Hervir suficiente agua en una olla y colocar los ñoquis hasta que floten dejar por unos minutos y retirar del agua, servir con la salsa que gustes`);

    let unChef19 = obtenerChefXUsuario("bperez");
    crearRecetaEnChefOAutor(unChef19, "Pollo", "Foto19.jpg", "89", `Salpimentamos los filetes de pechuga, los extendemos y disponemos sobre éstos un par de cucharadas del relleno de espinacas.`);

    let unChef20 = obtenerChefXUsuario("bperez");
    crearRecetaEnChefOAutor(unChef20, "Hamburguesa", "Foto20.jpg", "89", `Con un molde para hamburguesas ir armando las hamburguesas, tratando de que todas tengan el mismo grosor.`);
}



//Utilizamos "agregarMGyNMg" para cambiar los valores de las propiedades "CantidadMg" y "CantidadNmg".
//Ingresandole por parámetro el Id de la receta.
function agregarMGyNMg(pId, pCantidadMg, pCantidadNMg) {
    for (let i = 0; i < chefs.length; i++) {
        let chefX = chefs[i]; //accedo al chef en la lista chef.
        let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
        for (let x = 0; x < recetas.length; x++) { //Recorro las recetas del chef.
            let recetaX = recetas[x];
            if (recetaX.Id === pId) {
                //Para cada receta comparo el Id recibido por parámetro con el Id de la receta.
                //Les asigno a las propiedades los valores recibidos por parámetro.
                recetaX.CantidadMg = pCantidadMg;
                recetaX.CantidadNmg = pCantidadNMg;
            }

        }
    }
}


//Esta función devuelve el objeto Chef a travéz del nombre de usuario recibido por parámetro.
function obtenerChefXUsuario(pUsuario) {
    //Inicializamos la variable.
    let encontrado = null;
    let i = 0;
    while (i < chefs.length && encontrado === null) { //recorremos mientras no encuentre el objeto deseado.
        let chefActual = chefs[i];
        if (chefActual.Usuario === pUsuario) {
            //Para cada chef comparo el usuario recibido por parámetro con el nombre de usuario del chef.
            encontrado = chefActual;
        }
        i++;
    }

    return encontrado; //retornamos el objeto Chef buscado. Si no encuentra ninguno retornará null.
}






//** AGREGAR RECETAS Y COLABORADORES.


// AGREGAR (LO AGREGA A LAS RECETAS DE UN CHEF) Y LUEGO MUESTRA EN HTML.
function agregarRecetaHTML() {
    //Inicializamos la variable mensaje.
    let mensaje = "";

    let usuario = $("#txtUsuario").val(); //Recibimos el usuario a travéz del html.
    let unAutor = obtenerChefXUsuario(usuario); //obtenemos el objeto Chef (autor de receta) a través del usuario.
    let titulo = $("#txtTitulo").val(); //Recibimos el titulo a travéz del html.
    let tiempo = $("#txtTiempo").val(); //Recibimos el tiempo a travéz del html.
    let elaboracion = $("#txtElaboración").val(); //Recibimos la elaboración a travéz del html.
    let nombreArchivoDesdeHtml = $("#fileFoto").val();
    //Recibimos el nombre del archivo a travéz del html con fakepath. 

    let laFoto = quitarFakePath(nombreArchivoDesdeHtml); //quitamos el fakepath con la función "quitarFakePath".

    //antes de crear y guardar validamos los datos.
    if (tituloUnicoRecetaEnChef(unAutor, titulo)) {
        //Verificamos que el nombre de la receta sea único en el objeto Chef.

        if (unAutor !== null && crearRecetaEnChefOAutor(unAutor, titulo, laFoto, tiempo, elaboracion)) {
            //Verificamos que el autor sea válido y exista.
            //La función "crearRecetaEnChefOAutor" valida los datos y luego crea la receta.


            //Notificamos que se agregó si todo esta correcto.
            mensaje = "Se agregó correctamente.";

            //Actualizamos la lista de colaboradores y la lista de recetas con la nueva receta creada.
            listarColaboradores();
            mostrarTodo(chefs);

            //Vaciamos todas las cajas de texto a travéz de la clase.
            $(".vaciarIngReceta").val("");


        } else {
            mensaje = "Algún dato no es válido.";
        }

    } else {

        mensaje = "Ya existe la receta con ese título.";
    }

    //Mostramos el mensaje según corresponda.
    $("#divNotificacionesIngReceta").html(mensaje);
}





// TITULO DE RECETAS UNICO DENTRO DEL CHEF.
function tituloUnicoRecetaEnChef(pChef, pTitulo) {
    //Asumimos que el título es único.
    let unico = true;
    let x = 0;
    let listaRecetasDelChef = pChef.Recetas; //accedo a las recetas del chef pasado por parámetro.
    //Convierto el título a minúsculas para que sea una busqueda case insensitive.
    let tituloMin = pTitulo.toLowerCase();
    while (unico && x < listaRecetasDelChef.length) { //mientras sea único sigo recorriendo las recetas del chef.
        let recetaX = listaRecetasDelChef[x];
        if (recetaX.Titulo.toLowerCase() === tituloMin) {
            //Para cada receta comparo el título recibido por parámetro con el título de la receta.
            unico = false;
        }
        x++;
    }
    return unico; //retornamos la variable "unico" que devuelve true si es único y false en caso contrario.
}



// QUITAR FAKEPATH DE LA FOTO.
function quitarFakePath(pNombreArchivo) {
    let nombreArchivo = pNombreArchivo; //recibe un nombre de archivo.
    let iterador = pNombreArchivo.length - 1; //comienzo desde el final. 
    //desde el final hasta la barra. 
    //Porque es mas fácil encontrar el nombre.

    //Asumo que no la encontré.
    let posicionBarra = -1; //ubico la posición de la barra.
    let estaBarra = false;
    while (iterador > 0 && !estaBarra) {
        if (pNombreArchivo.charAt(iterador) === "\\" || pNombreArchivo.charAt(iterador) === "/") {
            //Cambia según el sistema operativo.
            estaBarra = true;
            posicionBarra = iterador;
            //Si encunetro la barra, guardo la posición.
        }
        iterador--;
    }
    if (estaBarra) {
        //tengo que arreglar nombre Archivo
        //quedarme sólo con el nombre 
        nombreArchivo = pNombreArchivo.substr(posicionBarra + 1);
    }
    return nombreArchivo; //retorna el nombre del archivo.
}




// AGREGAR COLABORADORES DESDE HTML.
function agregarColabHTML() {
    //Inicializamos la variable mensaje.
    let mensaje = "";

    let nombre = $("#txtNombre").val(); //Recibimos el nombre a travéz del html.
    let apellido = $("#txtApellido").val(); //Recibimos el apellido a travéz del html.

    if (crearChef(nombre, apellido)) {
        //La función "crearChef" valida los datos y luego crea el chef.


        //Notificamos que se agregó si todo esta correcto.
        mensaje = "Se agregó correctamente.";

        //Actualizamos la lista de colaboradores.
        listarColaboradores();

        //Vaciamos todas las cajas de texto a travéz de la clase.
        $(".vaciarIngColab").val("");

    } else {

        mensaje = "Algún dato no es válido.";
    }

    //Mostramos el mensaje según corresponda.
    $("#divNotificacionesIngColaboradores").html(mensaje);
}














//** CREAR RECETAS Y COLABORADORES.

// AGREGA RECETA AL ARRAY DE RECETAS DEL CHEF.
function crearRecetaEnChefOAutor(pObjetoChef, pTitulo, pFoto, pTiempo, pElaboracion) {

    //Asumimos que no se ha guardado la receta.
    let guardadoOK = false;

    if (pObjetoChef !== null) {
        if (colabRepetido(pObjetoChef.Usuario) && validarTitulo(pTitulo) && validarFoto(pFoto) && validarTiempo(pTiempo) && validarElaboracion(pElaboracion)) {
            //Validamos que el colaborador ya exista. Además que el título, foto, tiempo y elaboración sean válidos.

            //convertimos a número entero el tiempo ingresado.
            pTiempo = Number.parseInt(pTiempo);

            let recetaX = new Receta(); //creo una nueva receta.
            //Le asigno sus propiedades.
            recetaX.Id = idReceta;
            recetaX.Autor = pObjetoChef.Usuario;
            recetaX.Titulo = pTitulo;
            recetaX.Foto = pFoto;
            recetaX.Tiempo = pTiempo;
            recetaX.Elaboracion = pElaboracion;
            pObjetoChef.Recetas.push(recetaX); //se agrega la receta a las recetas del chef.
            idReceta++; //incremento id
            // notifico que se guardó
            guardadoOK = true;
        }
    }
    return guardadoOK;
    /*
    Al tener el chef al cual pertenece la receta puedo agregarlo e
    Incrementar el identificador
     */
}


//Validaciones para crearRecetaEnChefOAutor

function validarTitulo(pTitulo) {
    return pTitulo.trim().length > 2;
}
function validarFoto(pFoto) {
    let fotoValida = false;
    //Obtengo los últimos 4 caracteres.
    let extension = pFoto.substr(pFoto.length - 4);
    if (extension === ".jpg" || extension === ".png" || extension === ".gif" || extension === ".bmp") fotoValida = true;
    return fotoValida;
}
function validarTiempo(pTiempo) {
    return pTiempo.trim().length > 0 && !isNaN(pTiempo);
}
function validarElaboracion(pElaboracion) {
    return pElaboracion.trim().length <= 150;
}




//A partir de esta función sabemos si el colaborador ya existe en el sistema.
function colabRepetido(pUsuario) {
    //Asumimos que no está repetido.
    let repetido = false;
    let x = 0;
    while (!repetido && x < chefs.length) { //recorremos mientras no encuentre el usuario repetido.
        let elChef = chefs[x];
        if (elChef.Usuario === pUsuario) {
            //Para cada chef comparo el usuario recibido por parámetro con el nombre de usuario del chef.
            repetido = true;
        }
        x++;
    }
    return repetido; //retorna true si el nombre de usuario esta repetido y false en caso conntrario.
}




// AGREGA CHEF AL ARRAY
function crearChef(pNombre, pApellido) {
    //Asumimos que no se ha guardado el chef.
    let guardadoOK = false;

    if (validarNombre(pNombre) && validarApellido(pApellido)) {
        //Validamos el nombre y el apellido, ingresados por el administrador.

        //Creamos el usuario a travéz del nombre y apellido.
        let nombreUsuarioFinal = usuarioCompleto(pNombre, pApellido);

        //Creamos la constraseña a travéz del nombre y apellido.
        let passFinal = passCompleta(pNombre, pApellido);


        let chefX = new Chef(); //creo un nuevo chef.
        //Le asigno sus propiedades.
        chefX.Id = idChef;
        chefX.Usuario = nombreUsuarioFinal;
        chefX.Contraseña = passFinal;
        chefs.push(chefX); //se agrega a la lista chefs.
        idChef++; //incremento id
        // notifico que se guardó
        guardadoOK = true;
    }
    return guardadoOK;
}


//Validaciones para crearChef

function validarNombre(pNombre) {
    return pNombre.trim().length > 1;
}
function validarApellido(pContraseña) {
    return pContraseña.trim().length > 1;
}


//Creamos usuario a partir del nombre y apellido del colaborador.
function usuarioCompleto(pNombre, pApellido) {
    let primerLetra = pNombre.toLowerCase().charAt(0);
    let apellidoMinuscula = pApellido.toLowerCase();
    //quitamos los espacios del apellido.
    let apellidoSinEspacios = quitarEspacios(apellidoMinuscula);
    //concatenamos los strings para formar el usuario.
    let resultadoUsuario = `${primerLetra}${apellidoSinEspacios}`;

    //a travéz de la función "colabRepetidoAgregarNum" obtenemos colaboradores sin repetir.
    let nuevoUsuario = colabRepetidoAgregarNum(resultadoUsuario);

    return nuevoUsuario; //retora usuarios únicos, sin espacios.
}




//A travéz de esta función quitamos los espacios del apellido de un colaborador.
function quitarEspacios(pApellido) {
    //Inicializamos la variable.
    let apellidoSinEspacios = "";

    for (let i = 0; i < pApellido.length; i++) { //recorremos el apellido del colaborador.
        let miLetra = pApellido[i];
        if (miLetra !== " ") {
            //si el caracter en esta posición no es un espacio, entonces lo agrega a la variable "apellidoSinEspacios". 
            apellidoSinEspacios = apellidoSinEspacios + miLetra;
        }
    }
    return apellidoSinEspacios; //retorna apellido sin espacios.
}



//Creamos contraseña a partir del nombre y apellido del colaborador.
function passCompleta(pNombre, pApellido) {
    //utilizamos la función que retorna el nombre de usuario.
    let usuario = usuarioCompleto(pNombre, pApellido);
    //creamos un nuevo string con la primera letra
    let primeraLetra = usuario.charAt(0);
    //y otro con la segunda letra hasta el final.
    let apellido = usuario.substr(1);
    //concatenamos agregando un guión.
    let contraseña = primeraLetra + "-" + apellido;

    return contraseña; //retora constraseñas únicas, sin espacios.
}




//A partir de esta función obtenemos colaboradores únicos. Agregandole un número a los repetidos.
function colabRepetidoAgregarNum(pUsuario) {
    //Utilizamos un contador para saber la cantidad de veces que aparece el usuario, en el caso de repetirse.
    let cantidadDeVecesQAparece = 1;
    let nuevoUsuario = "";

    //Asumimos que no está repetido.
    let encontro = false;

    for (let i = 0; i < chefs.length; i++) {
        let chefX = chefs[i]; //accedo al chef en la lista chef.
        let nomUsuX = chefX.Usuario; //accedo al nombre de usuario del chef.
        if (esSubcadenaConNumero(nomUsuX.toLowerCase(), pUsuario.toLowerCase())) {
            //Para cada chef comparo el usuario recibido por parámetro con el nombre de usuario del chef.
            //Verificamos que pUsuario sea subcadena de nomUsuX. A su vez que nomUsuX termine con un número.
            //Si termina con un número, entonces pUsuario ya exite dos o mas veces en el Array.
            if (pUsuario.length === nomUsuX.length - 1) { //verifico que el tamaño sea el mismo sin contar el número.
                cantidadDeVecesQAparece++;
                nuevoUsuario = pUsuario + cantidadDeVecesQAparece;
                //aalvez1 cuenta pero aalvezota1 no cuenta
                //para contar tengo que verificar que luego de ser subacadena la siguiente posición sea un número.

                encontro = true;
            }

        } else {
            ////sólo para la primera vez que se repite.
            if (esSubcadena(nomUsuX.toLowerCase(), pUsuario.toLowerCase())) {
                //Verificamos que pUsuario sea subcadena de algunos de los nombres de usuario.
                if (pUsuario.length === nomUsuX.length) { //Verificar que el tamaño es el mismo.
                    //aalvez cuenta pero aalvezota no cuenta
                    nuevoUsuario = pUsuario + cantidadDeVecesQAparece;
                    //Al aparecer repetido por primera vez, le agregamos el número 1, que es el valor del contador al inicio.
                    encontro = true;
                }
            }
        }
    }
    //Si no encuentro usuario repetido, devuelvo el usuario recibido por parámetro.
    if (!encontro) {
        nuevoUsuario = pUsuario;
    }
    return nuevoUsuario; //retorna usuario único.
}


function esSubcadenaConNumero(pCadena, pSubCadena) {
    //Asumo que no es subCadena de texto.
    let siEsSubCadena = false;
    let x = 0; //pos en la cadena.

    //Por cada ciclo de iteración de la cadena, debo iniciar un nuevo ciclo de iteración para la subcadena.
    while (!siEsSubCadena && x < pCadena.length) { //recorro la cadena.
        //Iteración para moverse de caracter en la cadena.
        let iteSubCadena = 0; //pos subcadena.
        let iteCadena = x; //Necesito un iterador para recorrer la cadena a partir de esa posición.
        //Asumimos que es subCadena
        let banderaSubCadena = true;
        while (banderaSubCadena && iteSubCadena < pSubCadena.length && iteCadena < pCadena.length) {
            //Iteración para buscar subcadena.
            //Volver a válidar iteCadena < pCadena.length, para no usar una posición vacia.
            let carCadena = pCadena.charAt(iteCadena);
            let carSubCadena = pSubCadena.charAt(iteSubCadena);
            if (carCadena !== carSubCadena) {
                banderaSubCadena = false; //si hay un caracter que no coincide, entonces no es subcadena.
            }
            iteCadena++;
            iteSubCadena++;
        }
        if (banderaSubCadena && iteSubCadena === pSubCadena.length && !isNaN(pCadena.charAt(pCadena.length - 1))) {
            //debo verificar que se haya recorrido toda la subcadena y que termine en un número.
            siEsSubCadena = true; //Para que el primer while no busque nuevamente la subcadena.
        }
        x++;
    }
    return siEsSubCadena;
}











//** MOSTRAR.

//Mostramos todas las recetas al inicio de la aplicación.
function mostrarTodo(pChefs) {
    let maqueta = `<div>`

    for (let i = 0; i < pChefs.length; i++) {
        let chefX = pChefs[i]; //accedo al chef en la lista chef.
        let deshabilitado = chefX.Deshabilitado;
        let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
        if (!deshabilitado) { //Si el chef esta deshabilitado no se muestra la receta.
            for (let x = 0; x < recetas.length; x++) {
                let recetaX = recetas[x];

                //Ya conozco de antemano las propiedades. Creo variables para cada propiedad.
                let unAutor = chefX.Usuario;
                let unTitulo = recetaX.Titulo;
                let unaFoto = recetaX.Foto;
                let unTiempo = recetaX.Tiempo;
                let unaElaboracion = recetaX.Elaboracion;
                let unaCantidad = recetaX.CantidadMg;
                let unaCantidad2 = recetaX.CantidadNmg;

                //Muestro en la aplicación las propiedades de cada receta.
                maqueta += `<div>`
                maqueta += `<h2>${unTitulo}</h2>`
                maqueta += `<h4>${unAutor}</h4>`
                maqueta += `<img src="fotos/${unaFoto}" alt="${unTitulo}" />`;
                //src es el lugar y nombre del archivo fotos.
                maqueta += `<p class="duracion"><strong>${unTiempo}</strong> minutos</p>`
                maqueta += `<p>
                            ${unaElaboracion}
                            </p>`
                maqueta += `<p class="likes">
                            ${unaCantidad} 
                            <img class="btnMgNmg" atributoMG=${recetaX.Id} src="http://chefblog.develotion.com/like.png">
                            |
                            <img class="btnMgNmg" atributoNMG=${recetaX.Id} src="http://chefblog.develotion.com/dislike.png">
                            ${unaCantidad2}
                            </p>
                            <hr>`
                maqueta += `</div>`
            }
        }

    }
    maqueta += `</div>`;
    $("#divMuestroRecetas").empty(); //limpiamos de la pantalla la info que se muestra.
    $("#divMuestroRecetas").html(maqueta); //muestro la maqueta recien creada.
    $(".btnMgNmg").click(meGustaNomegustaGeneral);
}



function meGustaNomegustaGeneral() {
    let filaRecetas = $(this); //fila en la que di click 
    let codRecetaMG = $(filaRecetas).attr("atributoMG");
    let codRecetaNMG = $(filaRecetas).attr("atributoNMG");
    codRecetaMG = Number.parseInt(codRecetaMG); //convierto a número entero.
    codRecetaNMG = Number.parseInt(codRecetaNMG); //convierto a número entero.
    if (!isNaN(codRecetaMG)) {
        let laRecetaObjeto = obtenerRecetaPorIdEnChef(codRecetaMG); //obtengo la receta por Id
        if (laRecetaObjeto !== null) {
            laRecetaObjeto.CantidadMg++; //sumo mg
        } else {
            console.warn("No se encontro la receta por id");
        }
    }
    if (!isNaN(codRecetaNMG)) {
        let laRecetaObjeto = obtenerRecetaPorIdEnChef(codRecetaNMG); //obtengo la receta por Id
        if (laRecetaObjeto !== null) {
            laRecetaObjeto.CantidadNmg++; //sumo no mg
        } else {
            console.warn("No se encontro la receta por id");
        }
    }

    mostrarTodo(chefs); //Actualizo el listado de recetas.
}


//Esta función devuelve una receta a travéz del Id recibido por parámetro.
function obtenerRecetaPorIdEnChef(pId) {
    //Inicializamos la variable.
    let recetaEncontrada = null;

    let iteChef = 0;
    while (iteChef < chefs.length && recetaEncontrada === null) { //mientras no encuentre receta sigo recorriendo.
        let chefX = chefs[iteChef]; //accedo al chef en la lista chef.
        //para cada Chef recorrer sus recetas.
        let iteRecetas = 0;
        while (iteRecetas < chefX.Recetas.length && recetaEncontrada === null) {
            let recetaX = chefX.Recetas[iteRecetas];
            if (recetaX.Id === pId) {
                //Para cada receta comparo el id recibido por parámetro con el id de la receta.
                recetaEncontrada = recetaX;
            }

            iteRecetas++;
        }
        iteChef++;
    }
    return recetaEncontrada; //retornamos la receta buscada. Si no encuentra ninguna retornará null.
}







// BUSQUEDA.
function mostrarRecetasBusqueda(pArray) {
    let maqueta = `<div>`

    for (let x = 0; x < pArray.length; x++) {
        let recetaX = pArray[x];

        //Ya conozco de antemano las propiedades. Creo variables para cada propiedad.
        let unAutor = recetaX.Autor;
        let unTitulo = recetaX.Titulo;
        let unaFoto = recetaX.Foto;
        let unTiempo = recetaX.Tiempo;
        let unaElaboracion = recetaX.Elaboracion;
        let unaCantidad = recetaX.CantidadMg;
        let unaCantidad2 = recetaX.CantidadNmg;

        let chef = obtenerChefXUsuario(unAutor);
        if (chef !== null) { //si encuentro el objeto chef.
            let deshabilitado = chef.Deshabilitado;
            if (!deshabilitado) { //si no esta deshabilitado, entonces muestro la receta.


                //Muestro en la aplicación las propiedades de cada receta.
                maqueta += `<div>`
                maqueta += `<h2>${unTitulo}</h2>`
                maqueta += `<h4>${unAutor}</h4>`
                maqueta += `<img src="fotos/${unaFoto}" alt="${unTitulo}" />`;
                //src es el lugar y nombre del archivo fotos.
                maqueta += `<p class="duracion"><strong>${unTiempo}</strong> minutos</p>`
                maqueta += `<p>
                            ${unaElaboracion}
                            </p>`
                maqueta += `<p class="likes">
                            ${unaCantidad} 
                            <img class="btnMgNmg" atributoMG=${recetaX.Id} src="http://chefblog.develotion.com/like.png">
                            |
                            <img class="btnMgNmg" atributoNMG=${recetaX.Id} src="http://chefblog.develotion.com/dislike.png">
                            ${unaCantidad2}
                            </p>
                            <hr>`
                maqueta += `</div>`
            }
        } else {
            console.warn("No se encontro el chef por usuario");
        }
    }
    maqueta += `</div>`;
    $("#divMuestroRecetas").empty(); //limpiamos de la pantalla la info que se muestra.
    $("#divMuestroRecetas").html(maqueta);  //muestro la maqueta recien creada.
    $(".btnMgNmg").click(meGustaNomegustaBusqueda);
}


function meGustaNomegustaBusqueda() {
    let filaRecetas = $(this); //fila en la que di click 
    let codRecetaMG = $(filaRecetas).attr("atributoMG");
    let codRecetaNMG = $(filaRecetas).attr("atributoNMG");
    codRecetaMG = Number.parseInt(codRecetaMG); //convierto a número entero.
    codRecetaNMG = Number.parseInt(codRecetaNMG); //convierto a número entero.
    if (!isNaN(codRecetaMG)) {
        let laRecetaObjeto = obtenerRecetaPorIdEnChef(codRecetaMG); //obtengo la receta por Id.
        if (laRecetaObjeto !== null) {
            laRecetaObjeto.CantidadMg++; //sumo mg
        } else {
            console.warn("No se encontro la receta por id");
        }
    }
    if (!isNaN(codRecetaNMG)) {
        let laRecetaObjeto = obtenerRecetaPorIdEnChef(codRecetaNMG); //obtengo la receta por Id.
        if (laRecetaObjeto !== null) {
            laRecetaObjeto.CantidadNmg++; //sumo no mg
        } else {
            console.warn("No se encontro la receta por id");
        }
    }
    busquedaDeRecetas(); //POR SER LOCAL recetasBusqueda NO PODEMOS ACCEDER DE OTRA FORMA.
}






//REPORTES.

function mostrarRecetasReportes(pArray) {
    let maqueta = `<div>`

    for (let x = 0; x < pArray.length; x++) {
        let recetaX = pArray[x];


        //Ya conozco de antemano las propiedades. Creo variables para cada propiedad.
        let unAutor = recetaX.Autor;
        let unTitulo = recetaX.Titulo;
        let unaFoto = recetaX.Foto;
        let unTiempo = recetaX.Tiempo;
        let unaElaboracion = recetaX.Elaboracion;
        let unaCantidad = recetaX.CantidadMg;
        let unaCantidad2 = recetaX.CantidadNmg;

        let chef = obtenerChefXUsuario(unAutor);
        if (chef !== null) { //si encuentro el objeto chef.
            let deshabilitado = chef.Deshabilitado;
            if (!deshabilitado) { //si no esta deshabilitado, entonces muestro la receta.

                //Muestro en la aplicación las propiedades de cada receta.
                maqueta += `<div>`
                maqueta += `<h2>${unTitulo}</h2>`
                maqueta += `<h4>${unAutor}</h4>`
                maqueta += `<img src="fotos/${unaFoto}" alt="${unTitulo}" />`;
                //src es el lugar y nombre del archivo fotos.
                maqueta += `<p class="duracion"><strong>${unTiempo}</strong> minutos</p>`
                maqueta += `<p>
                            ${unaElaboracion}
                            </p>`
                maqueta += `<p class="likes">
                            ${unaCantidad} 
                            <img class="btnMgNmg" atributoMG="${recetaX.Id}" src="http://chefblog.develotion.com/like.png">
                            |
                            <img class="btnMgNmg" atributoNMG="${recetaX.Id}" src="http://chefblog.develotion.com/dislike.png">
                            ${unaCantidad2}
                            </p>
                            <hr>`
                maqueta += `</div>`
            }
        } else {
            console.warn("No se encontro el chef por usuario");
        }
    }
    maqueta += `</div>`;

    return maqueta;  //retorno la maqueta recien creada.
    
}









//** ORDEN
function ordenRecetas() {
    chefs.sort(criterioChefPrimero);
}

function criterioChefPrimero(pChefA, pChefB) {
    let orden = 0;
    //difinir el orden por la comparación de la propiedad /propiedades que elija.
    //x Usuario
    if (pChefA.Usuario === "chef" || pChefB.Usuario === "chef") { //ordeno chef primero
        orden = -1;
    }
    if (pChefA.Usuario !== "chef" && pChefB.Usuario !== "chef") {
        //ordeno los colaboradores por orden ascendente.

        /* Ascendente 
        1 A > B    0 A ===B  -1 A < B
        */
        if (pChefA.Usuario > pChefB.Usuario) {
            orden = 1;
        }
        if (pChefA.Usuario < pChefB.Usuario) {
            orden = -1;
        }
    }

    return orden;
}










//** LISTAR COLABORADORES.


//Muestra un listado con todos los colaboradores en el sistema.
function listarColaboradores() {
    let laLista = `<ul>`;
    for (let x = 0; x < chefs.length; x++) {
        let miChef = chefs[x]; //accedo al chef en la lista chef.
        let estadoColaborador = "";
        if (miChef.Deshabilitado) estadoColaborador = `deshabilitado`;
        if (!miChef.Deshabilitado) estadoColaborador = `habilitado`;
        if (miChef.Usuario !== "chef") { //muestro todos menos el administrador.
            laLista += `<li class="filaLista" miatributo=${miChef.Id}> ${miChef.Usuario}
             &nbsp;&nbsp;&nbsp; cantidad de recetas: ${miChef.Recetas.length} El colaborador esta: ${estadoColaborador} &nbsp;&nbsp;&nbsp;
            </li>`;
        }
    }
    laLista += `</ul>`;

    $("#divListarColaboradores").empty(); //limpiamos de la pantalla la info que se muestra.
    $("#divListarColaboradores").html(laLista); //muestro la lista recien creada.
    //Asignarle evento a las filas de la lista para deshabilitar y rehabilitar.
    $(".filaLista").click(elegirChefDesdeFila);
}


//** DESHABILITAR y REHABILITAR.

function elegirChefDesdeFila() {
    let lafila = $(this); //fila en la que di click   
    // porque lo asigné antes  $(".filaLista").click(elegirChefDesdeFila);

    let codChef = $(lafila).attr("miatributo");  //el atributo lo cree antes
    //laLista += `<tr class="filaLista" miatributo=${chefX.Id} >`;

    codChef = Number.parseInt(codChef); //convertimos a entero el id del chef.
    let elChefObjeto = obtenerChefXid(codChef); //buscamos el objeto chef por id.

    if (elChefObjeto !== null) { //si encuentro el objeto chef.

        //deshabilitamos o rehabilitamos al colaborador.
        let colabHabilitado = deshabilitarHabilitarColaborador(elChefObjeto);

        //Actualizamos la lista de recetas con los colaboradores habilitados, sin mostrar los deshabilitados.
        mostrarTodo(chefs);

        if (colabHabilitado) { //segun el valor de la variable (true-false)

            $("#divNotificaciones").html(`El colaborador: ${elChefObjeto.Usuario} ha sido deshabilitado`);
        } else {
            $("#divNotificaciones").html(`El colaborador: ${elChefObjeto.Usuario} ha sido rehabilitado`);
        }

        //Actualizamos la lista de colaboradores.
        listarColaboradores();

    } else {
        console.warn("No se encontro el colaborador por id");
    }
}



//Esta función devuelve el objeto chef a travéz del Id recibido por parámetro.
function obtenerChefXid(pId) {
    //Inicializamos la variable.
    let chefX = null;
    let pos = 0;
    while (chefX === null && pos < chefs.length) { //recorremos mientras no encuentre el objeto deseado.
        let chefActual = chefs[pos];
        if (chefActual.Id === pId) {
            //Para cada chef comparo el Id recibido por parámetro con el Id del chef.
            chefX = chefActual;
        }
        pos++;
    }
    return chefX; //retorna el objeto chef buscado. Si no encuentra ninguno retornará null.
}




//Cambia la propiedad de los colaboradores.
//Si estan habilitados los deshabilita, si estan deshabilitados los habilita.
function deshabilitarHabilitarColaborador(pChef) {
    if (pChef.Deshabilitado === false) {
        pChef.Deshabilitado = true;
    } else {
        pChef.Deshabilitado = false;
    }
    return pChef.Deshabilitado;
}









//** BUSCAR RECETA

function busquedaDeRecetas() {
    //Inicializamos variable mensaje;
    let mensaje = "";
    //Asumimos que no se encontro la receta.
    let noSeEncontro = true;
    //Creamos un nuevo array para guardar las recetas de la busqueda.
    let recetasBusqueda = new Array();


    let nombreOCriterio = $("#txtBuscarReceta").val(); //Recibimos el nombre o critero a travéz del html.


    //Limpiamos el div de notificaciones antes de buscar una nueva receta. Para que muestre un nuevo mensaje.
    $("#divNotificacionesBusqueda").empty();


    if (validarNombreBusqueda(nombreOCriterio)) { //Validamos que el usuario ingrese datos.

        let nombreMin = nombreOCriterio.toLowerCase();
        //creamos un nuevo string en minúsculas para comparar (case insensitive).

        for (let i = 0; i < chefs.length; i++) {
            let chefX = chefs[i]; //accedo al chef en la lista chef.
            let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
            for (let x = 0; x < recetas.length; x++) {
                let recetaX = recetas[x];
                if (recetaX.Titulo.toLowerCase() === nombreMin) {
                    //Comparo el nombre recibido por parámetro con el titulo de la receta.
                    //Si coincide la agrego al Array.
                    recetasBusqueda.push(recetaX);
                    noSeEncontro = false;
                    //Se encontró receta.
                } else {
                    if (esSubcadena(recetaX.Elaboracion.toLowerCase(), nombreMin)) {
                        //Comparo el criterio recibido por parámetro con la elaboración de la receta.
                        //Si coincide la agrego al Array.
                        recetasBusqueda.push(recetaX);
                        noSeEncontro = false;
                        //Se encontró receta.
                    }
                }
            }

        }
        mostrarRecetasBusqueda(recetasBusqueda); //muestro las recetas del array de busqueda.
    } else {
        mensaje = "Ingrese un nombre de receta o criterio de busqueda." //cuando no se ingresa nada.
    }
    if (noSeEncontro) {
        mensaje = "No hay resultados que coincidan con la búsqueda";
        mostrarTodo(chefs); //no se busca nada y se muestran todas las recetas.
    }
    $("#divNotificacionesBusqueda").html(mensaje);
}

//Validaciones para busquedaDeRecetas()

function validarNombreBusqueda(pNombre) {
    return pNombre.trim().length > 0;
}



function esSubcadena(pCadena, pSubCadena) {
    //Asumo que no es subCadena de texto.
    let siEsSubCadena = false;
    let x = 0; //pos en la cadena.

    //Por cada ciclo de iteración de la cadena, debo iniciar un nuevo ciclo de iteración para la subcadena.
    while (!siEsSubCadena && x < pCadena.length) { //recorro la cadena.
        //Iteración para moverse de caracter en la cadena.
        let iteSubCadena = 0; //pos subcadena.
        let iteCadena = x; //Necesito un iterador para recorrer la cadena a partir de esa posición.
        //Asumimos que es subCadena
        let banderaSubCadena = true;
        while (banderaSubCadena && iteSubCadena < pSubCadena.length && iteCadena < pCadena.length) {
            //Iteración para buscar subcadena.
            //Volver a válidar iteCadena < pCadena.length, para no usar una posición vacia.
            let carCadena = pCadena.charAt(iteCadena);
            let carSubCadena = pSubCadena.charAt(iteSubCadena);
            if (carCadena !== carSubCadena) {
                banderaSubCadena = false; //si hay un caracter que no coincide, entonces no es subcadena.
            }
            iteCadena++;
            iteSubCadena++;
        }
        if (banderaSubCadena && iteSubCadena === pSubCadena.length) {
            //debo verificar que se haya recorrido toda la subcadena.
            siEsSubCadena = true; //Para que el primer while no busque nuevamente la subcadena.
        }
        x++;
    }
    return siEsSubCadena;
}














//**  REPORTES

function reportesTiempo() {
    //Creamos un nuevo array para guardar las recetas del reporte por tiempo.
    let recetasReportes = new Array();


    let tiempo = $("#txtTiempoReportes").val(); //Recibimos el tiempo a travéz del html.

    if (validarTiempo(tiempo)) { //Validamos que el usuario ingrese tiempo.

        tiempo = Number.parseInt(tiempo); //Convertimos a entero.

        for (let i = 0; i < chefs.length; i++) {
            let chefX = chefs[i]; //accedo al chef en la lista chef.
            let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
            for (let x = 0; x < recetas.length; x++) {
                let recetaX = recetas[x];
                if (recetaX.Tiempo >= tiempo) recetasReportes.push(recetaX);
                //Si el tiempo de las recetas es igual o mayor al tiempo recibido, entonces agrego al array.


            }
        }

        //TIEMPO
        let tablaReportes = mostrarRecetasReportes(recetasReportes);
        $("#divMuestroRecetas").empty(); //limpiamos de la pantalla la info que se muestra.
        $("#divMuestroRecetas").html(tablaReportes); //muestro las recetas del array de reportes.

    } else {
        $("#divNotificacionesReportes").html(`Ingrese un tiempo válido`);
    }
}




function reportesMaximo() {
    //Creamos un nuevo array para guardar las recetas del reporte maximas.
    let recetasMaximas = new Array();
    let maximo = 0;


    for (let i = 0; i < chefs.length; i++) {
        let chefX = chefs[i]; //accedo al chef en la lista chef.
        let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
        for (let x = 0; x < recetas.length; x++) {
            let recetaX = recetas[x];
            if (recetaX.Tiempo > maximo) maximo = recetaX.Tiempo;
            //Obtenemos el tiempo maximo de las recetas del sistema.

        }
    }
    for (let i = 0; i < chefs.length; i++) {
        let chefX = chefs[i]; //accedo al chef en la lista chef.
        let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
        for (let x = 0; x < recetas.length; x++) {
            let recetaX = recetas[x];
            if (recetaX.Tiempo === maximo) recetasMaximas.push(recetaX);
            //Agrego al array las recetas que tengan ese tiempo máximo.
        }
    }

    //MAYORES
    let tablaMayores = mostrarRecetasReportes(recetasMaximas);
    $("#divMuestroRecetas").empty(); //limpiamos de la pantalla la info que se muestra.
    $("#divMuestroRecetas").html(`<br><h3>Recetas de mayor duración</h3>` + tablaMayores);
    //muestro las recetas del array de reportes.

}








function reportesPorcentaje() {
    //Creamos un nuevo array para guardar las recetas de mejor porcentaje de rendimiento.
    let recetasPorcentajes = new Array();
    let maximoRendimiento = 0;


    for (let i = 0; i < chefs.length; i++) {
        let chefX = chefs[i]; //accedo al chef en la lista chef.
        let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
        for (let x = 0; x < recetas.length; x++) {
            let recetaX = recetas[x];

            if ((recetaX.CantidadMg >= 0 && recetaX.CantidadNmg > 0) || (recetaX.CantidadNmg >= 0 && recetaX.CantidadMg > 0)) {
                //Se toman en cuenta solamente las recetas que tengan al menos una valoración.
                totalValoraciones = recetaX.CantidadMg + recetaX.CantidadNmg;
                //Sumamos cantidad de mg y no mg.
                let porcentaje = (recetaX.CantidadMg / totalValoraciones) * 100;
                if (porcentaje > maximoRendimiento) maximoRendimiento = porcentaje;
                //Obtenemos el porcentaje maximo de las recetas del sistema.
            }

        }
    }
    for (let i = 0; i < chefs.length; i++) {
        let chefX = chefs[i]; //accedo al chef en la lista chef.
        let recetas = chefX.Recetas; //accedo a las recetas de la lista chef.
        for (let x = 0; x < recetas.length; x++) {
            let recetaX = recetas[x];

            if ((recetaX.CantidadMg >= 0 && recetaX.CantidadNmg > 0) || (recetaX.CantidadNmg >= 0 && recetaX.CantidadMg > 0)) {
                //Se toman en cuenta solamente las recetas que tengan al menos una valoración.
                totalValoraciones = recetaX.CantidadMg + recetaX.CantidadNmg;
                let porcentaje = (recetaX.CantidadMg / totalValoraciones) * 100;
                if (porcentaje === maximoRendimiento) recetasPorcentajes.push(recetaX);
                //Agrego al array las recetas que tengan ese porcentaje/rendimiento máximo.
            }
        }
    }
    //PORCENTAJE DE RENDIMIENTO
    let tablaRendimiento = mostrarRecetasReportes(recetasPorcentajes);
    $("#divMuestroRecetas").empty(); //limpiamos de la pantalla la info que se muestra.
    $("#divMuestroRecetas").html(`<br><h3>Recetas con mejor porcentaje de rendimiento</h3>` + tablaRendimiento);
    //muestro las recetas del array de reportes.
}










//** INICIAR SESIÓN.
function iniciarSesion() {

    let usuario = $("#txtUsuario").val(); //Recibimos el usuario a travéz del html.
    let contraseña = $("#txtContraseña").val(); //Recibimos la constraseña a travéz del html.

    // Verificar que sean válidos.
    // Según quien ingresa se muestran ciertas cosas.
    if (usuario === "chef" && contraseña === "chef-01") {

        //BOTONES.
        $(".administrador").show();
        $(".adminColab").show();
        //CERRAR SESIÓN
        $("#LiCerrarSesion").show();
        //OCULTAR INICIAR SESIÓN.
        $("#divOcultarIniciarSesion").hide();

        //Actualizamos la lista de colaboradores y la lista de recetas.
        listarColaboradores();
        mostrarTodo(chefs);

    } else {
        if (ususarioYContraseñaValido(usuario, contraseña) && !colaboradorDeshabilitado(usuario)) {
            // NOS FIJAMOS QUE EXISTA.
            //Si el colaborador está habilitado, entonces colaboradorDeshabilitado(usuario)=false.
            //Niego la expresión para mostrar al estar habilitado.

            //BOTON AGREGAR RECETA.
            $(".adminColab").show();
            //CERRAR SESIÓN
            $("#LiCerrarSesion").show();
            //OCULTAR INICIAR SESIÓN.
            $("#divOcultarIniciarSesion").hide();

            //Actualizamos la lista de recetas.
            mostrarTodo(chefs);

        } else {
            if (colaboradorDeshabilitado(usuario)) {
                $("#divNotificacionIniSesion").html("Usted esta deshabilitado");
            } else {
                $("#divNotificacionIniSesion").html("Ingrese un usuario y una contraseña válida");
            }
        }
    }
    //Limpiamos caja de texto y notificaciones.
    limpiarBusquedaDeRecetas();

}


//A partir de esta función sabemos si estan deshabilitado o no los colaboradores.
function colaboradorDeshabilitado(pUsuario) {
    //Asumimos que está habilitado.
    let deshabilitado = false;
    let chef = obtenerChefXUsuario(pUsuario);
    //Obtenemos el colaborador a partir de su nombre de usuario.
    if (chef !== null) {
        if (chef.Deshabilitado) deshabilitado = true;
        //Si está deshabilitado cambio el valor de la variable.
    } else {
        console.warn("No se encontro el chef por usuario");
    }
    return deshabilitado; //retorna true si esta deshabilitado y false en caso contrario.
}



//Valida los datos recibidos por parámetro. Verifica la existencia de los datos.
function ususarioYContraseñaValido(pUsuario, pContraseña) {
    //Asumimos que no existen.
    let existe = false;
    let x = 0;
    while (!existe && x < chefs.length) { //recorremos mientras no existan los datos.
        let elChef = chefs[x];
        if (elChef.Usuario === pUsuario && elChef.Contraseña === pContraseña) {
            //Comparo el usuario y constraseña recibido por parámetro con los usuarios y constraseñas de los chefs.
            existe = true;
        }
        x++;
    }
    return existe; //retorna true si existe y false en caso contrario.
}









//**  CERRAR SESIÓN
function cerrarSesion() {
    //Ocultamos todo.
    ocultarGral();

    //Al cerrar sesión volvemos a mostrar el div para iniciar sesión.
    $("#divOcultarIniciarSesion").show();

    //Cambio la bandera
    //PARA QUE CUANDO HAGA CLICK POR PRIMERA VEZ LUEGO DE CERRAR ME PERMITA VISUALIZAR LA FUNCIONALIDAD.
    //Me muestra usuario y contraseña.
    seMuestraIS = false;


    //Vacio las notificaciones de iniciar sesión para volver a ingresar.
    $("#divNotificacionIniSesion").empty();
    //Limpio las cajas de texto.
    $(".vaciarIniSesion").val("");

    //Limpiamos caja de texto y notificaciones.
    limpiarBusquedaDeRecetas();

    //Vuelvo a mostrar todas las recetas.
    mostrarTodo(chefs);
}
