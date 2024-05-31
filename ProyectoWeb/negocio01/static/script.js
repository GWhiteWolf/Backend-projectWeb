/* inicio de la verificacion de edad*/

const modal = document.querySelector('.modal');/*varible la cual seleciona la clase modal*/
const ageVerificationCompleted = sessionStorage.getItem('ageVerificationCompleted');/*varible la cual obtine true si la verifiacion de edad esta guardad en la session storage*/
const closeButton = document.querySelector('.modal_close');/*variable que seleciona la clase modal_close*/


if (ageVerificationCompleted !== 'true') {
    modal.classList.add('modal--show');
}/*si la vaiable ageVerificationCompleted es distinto a true muestra la verificacion de edad*/

function closeModalVerification() {
    modal.classList.remove('modal--show');
    sessionStorage.setItem('ageVerificationCompleted', 'true');
}/*esta funcion cierra la ventana de verificacion de edad y le asigna a la variable ageVerificationComplete el valor de true*/

closeButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    closeModalVerification();
});/*si se hace click sobre el boton de soy mayor de 18 se llama a la funcion de closeModalVerification*/

/*fin de la verificacion de edad*/





/*inicio de la funcion de agregar al carrito*/
// funciones carrito de compras
var carritoVisible = false;

if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


function ready() {
    //funcionalidad botones eliminar
    var botonesEliminar = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminar.length; i++) {
        var button = botonesEliminar[i];
        button.addEventListener('click', eliminarItem);
    }

    //funcionalidad botones agregar 
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //funcionalidad botones restar
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //funcionalidad botones Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('button-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}    

//Elimino el item seleccionado del carrito
function eliminarItem(event) {
    var buttonCliked = event.target;
    buttonCliked.parentElement.parentElement.remove();
    

    actualizarTotal();

    ocultarCarrito();
}


//Actualizo el total del carrito
function actualizarTotal(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0; 

    for(var i = 0; i < carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);

        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio); 
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad); 
        total =  total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$ ' + total.toLocaleString("CL");

}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount == 0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-productos')[0];
        items.style.width = '100%'
    }
}

function sumarCantidad(event){
    var buttonCliked = event.target;
    var selector = buttonCliked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual); 
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

    actualizarTotal();
}

function restarCantidad(event){
    var buttonCliked = event.target;
    var selector = buttonCliked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual); 
    cantidadActual--;
    if(cantidadActual >= 1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

        actualizarTotal();
    }
    
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('card-title')[0].innerText;
    console.log(titulo); 
    var precio = item.getElementsByClassName('card-text')[0].innerText;
    var imagenSrc = item.getElementsByClassName('card-img-top')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    actualizarTotal();
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var ItemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //compruebo si el item ya esta en el carrito
    var nombresItemsCarrito = ItemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i = 0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            alert('Este item ya esta en el carrito');
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="Producto 1" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="fa-solid fa-minus restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = itemCarritoContenido;
    ItemsCarrito.append(item);

    //funciones de botones nuevos items
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItem);

    var botonesSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonesSumarCantidad.addEventListener('click', sumarCantidad);

    var botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonesRestarCantidad.addEventListener('click', restarCantidad);
}


function pagarClicked(event){
    alert('Gracias por su compra');

    var carritoItems = document.getElementsByClassName('carrito-items')[0];

    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotal();

    ocultarCarrito();

}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.display = 'block';

    setTimeout(() => {
    carrito.style.opacity = '1';
    }, 10);

    var items = document.getElementsByClassName('contenedor-productos')[0];
    items.style.width = '60%';
}


/*fin de la funciones de carrito*/






/*inicio del form de contacto*/

const contactanosLink = document.querySelector('a[href="#contactanos"]');/*almacena en una variable el link de contactanos*/
const modal1 = document.querySelector('.modal1');/*almacena en una variable la clase modal1*/
const salirbuttonLink1 = document.querySelector('a[href="#salirbutton1"]');/*almacena en una variable el link del icono de salir*/

contactanosLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal1.classList.add('modal1--show');
});/*al hacer click en contactanos muestra el form*/

salirbuttonLink1.addEventListener('click', (e) => {
    e.preventDefault();
    modal1.classList.remove('modal1--show');
});/*al hacer click en la x sale del form de contactanos*/

/*fin del form de contactanos*/





/*inicio del form de ingresar*/

const usuariolink = document.querySelector('a[href="#session"]');/*almacena en una variable el link de iniciar session*/
const modal2 = document.querySelector('.modal2');/*almacena en una variable la clase modal2*/
const salirbuttonLink2 = document.querySelector('a[href="#salirbutton2"]');/*almacena en una variable el link del icono de salir*/

usuariolink.addEventListener('click', (e) => {
    e.preventDefault();
    modal2.classList.add('modal2--show');
});/*al hacer click en la imagen de usuario se abre el form de inicio de sesión*/
salirbuttonLink2.addEventListener('click', (e) => {
    e.preventDefault();
    modal2.classList.remove('modal2--show');
});/*al hacer click en la x cierra el form de inicio de sesion*/

/*fin del form de ingresar*/





/*inicio del form de registrarse*/

const registratelink = document.querySelector('a[href="#registrarse"]');/*almacena en una variable el link de registrarse*/
const modal3 = document.querySelector('.modal3');/*almacena en una variable la clase modal3*/
const salirbuttonLink3 = document.querySelector('a[href="#salirbutton3"]');/*almacena en una variable el link del icono de salir*/
const tinescuentalink = document.querySelector('a[href="#session1"');
registratelink.addEventListener('click', (e) => {
    e.preventDefault();
    modal2.classList.remove('modal2--show');
    modal3.classList.add('modal3--show');
});/*al hacer click sobre registrarse cierra el form de inicio de sesion y abre el form de registrarse*/
salirbuttonLink3.addEventListener('click', (e) => {
    e.preventDefault();
    modal3.classList.remove('modal3--show');
});/*al hacer click sobre la x del form de registrarse cierra el form de registrarse*/
tinescuentalink.addEventListener('click', (e) => {
    e.preventDefault();
    modal3.classList.remove('modal3--show');
    modal2.classList.add('modal2--show');
});

/*fin del form de registro*/




/*se crean variables para un usuario*/ 

function crearusuario(){
    let regcorreo = document.getElementById("reg-correo").value;
    let regclave = document.getElementById("reg-clave").value;
    let regnombre = document.getElementById("reg-nombre").value;
    let regapellido = document.getElementById("reg-apellido").value;
    let regdireccion = document.getElementById("reg-direccion").value;
    alert(regcorreo);
}

document.querySelector('.seccion-suscribir a[href="#subbtt"]').addEventListener("click", function(event) {
    event.preventDefault(); // Evitar que el enlace realice su acción predeterminada (navegar a otra página)

    var emailInput = document.getElementById('subs-email');
    var email = emailInput.value.trim(); // Obtener el valor del campo de correo electrónico y quitar espacios en blanco al inicio y al final

    if (email === "") { // Verificar si el campo está vacío
        emailInput.style.borderColor = "red"; // Cambiar el color del borde a rojo
        emailInput.style.color = "red"; // Cambiar el color del texto a rojo
        emailInput.placeholder = " Ingrese correo"; // Cambiar el marcador de posición
        emailInput.value = ""; // Vaciar el campo de entrada
        return; // Detener la ejecución de la función
    }

    // Expresión regular para validar el formato de correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) { // Verificar si el formato del correo electrónico es válido
        emailInput.style.borderColor = "red"; // Cambiar el color del borde a rojo
        emailInput.style.color = "red"; // Cambiar el color del texto a rojo
        emailInput.placeholder = " Ingrese un correo válido"; // Cambiar el marcador de posición
        emailInput.value = ""; // Vaciar el campo de entrada
        return; // Detener la ejecución de la función
    }
    
    // Si se ha ingresado un correo electrónico con el formato correcto, restablecer los estilos del campo de entrada
    emailInput.removeAttribute('style'); // Eliminar los estilos CSS aplicados
    emailInput.placeholder = "Juan@gmail.com"; // Restablecer el marcador de posición
    emailInput.value = ""; // Vaciar el campo de entrada
    window.location.reload();
    alert('Ahora suscrito nuestras novedades!');
});

// Restablecer los estilos del campo de entrada cuando el usuario lo vuelve a enfocar
document.getElementById('subs-email').addEventListener('focus', function() {
    this.removeAttribute('style'); // Eliminar los estilos CSS aplicados
    this.placeholder = "Juan@gmail.com"; // Restablecer el marcador de posición
});



