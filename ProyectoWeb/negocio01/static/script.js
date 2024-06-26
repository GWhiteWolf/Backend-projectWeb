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

closeButton?.addEventListener('click', (e) => {
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

    document.getElementsByClassName('btn-pagar')[0]?.addEventListener('click', pagarClicked);
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
        carrito.style.opacity = '0';
        carritoVisible = false;
        carrito.style.display = 'none';
        
        var items = document.getElementsByClassName('contenedor-productos')[0];
        items.style.width = '100%';
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





//validacion de form de contactanos
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form?.addEventListener('submit', function(event) {
        event.preventDefault(); // Detener el envío del formulario por defecto
        
        // Ejemplo de validación de campo de correo electrónico utilizando la función validateEmail
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email === '' || !validateEmail(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Email ingresado no es valido!',
                icon: 'error',
            });
            emailInput.focus(); // Poner el foco en el campo de correo electrónico
            return;
        }

        Swal.fire({
            title: 'Exito!',
            text: 'Hemos recibido tu mensaje correctamente',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit(); // Enviar el formulario
            }
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
