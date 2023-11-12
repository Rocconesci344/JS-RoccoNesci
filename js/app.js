
// Voy a ir comentando el codigo de entregas anteriores asi se ve como fui mejorandolo aplicando lo aprendido

// let LoNameUser = localStorage.getItem("NameUser");

// if (!LoNameUser) {
//     let NameUser = prompt("Ingrese un nombre de usuario");
//     LoNameUser=NameUser
//     localStorage.setItem("NameUser", NameUser);
//     alert("Bienvenido: " + NameUser);
// }else{

// }



// function login() {
//     let Contraseña = prompt('Bienvenido ' + LoNameUser + ' Ingrese su nueva contraseña, NO SE LA OLVIDE PORQUE NO PODRA ACCEDER AL SISTEMA');
//     if (Contraseña===''){
    
//         do{
//         alert('DEBE INGRESAR UNA CONTRASEÑA')
//         Contraseña = prompt('Ingrese su nueva contraseña, NO SE LA OLVIDE PORQUE NO PODRA ACCEDER AL SISTEMA');
//     }while (Contraseña==='')
// }
//     let intentos = 3;
//     let ingresar = false;
//     for (let i = intentos; i > 0; i--) {
//         let Ncontraseña = prompt('Ingresá la contraseña, Tenés ' + i + ' intentos.');
//         if (Ncontraseña === Contraseña) {
//             alert('Bienvenido/a al sistema');
//             ingresar = true;
//             break;
//         } else {
//             alert('Error, Te quedan ' + (i - 1) + ' intentos.');
//         }
//     }
//     return ingresar;
// }



const LoNameUser = localStorage.getItem("NameUser");
document.addEventListener("DOMContentLoaded", function () {
    const Form_Login = document.getElementById("Form_L");
    const inputEmail = document.getElementById("inputEmail");
    const saveButton = document.getElementById("saveButton");
    if (LoNameUser) {
        Form_Login.style.display = "none";
    } else {
        Form_Login.style.display = "block";
        NameUserIndex.style.display = "none"
    }

    saveButton.addEventListener("click", function () {
        const newName = inputEmail.value;
        localStorage.setItem("NameUser", newName);
        NameUserIndex.style.display = "block"
        NameUserIndex.innerHTML = 'Bienvenido ' + newName;
        Form_Login.style.display = "none";
    });
});

const juegosJSON = [
    '{"ID": 1, "nombre": "Tlou", "precio": 7000, "thumbnail": "./assets/the-last-of-us-part-ii-1.jpg"}',
    '{"ID": 2, "nombre": "Spiderman", "precio": 8500, "thumbnail": "./assets/spiderman_ps4.jpg"}',
    '{"ID": 3, "nombre": "Days gone", "precio": 9250, "thumbnail": "./assets/daysgone_ps4.jpg"}'
];

const jJSON = '[' + juegosJSON.join(',') + ']';

const Juegos = JSON.parse(jJSON);

const nuevoJuego = {
    ID: Juegos.length + 1,
    nombre: "Minecraft",
    precio: 7777,
    thumbnail: "./assets/minecraft-ps4.jpg"
};

Juegos.push(nuevoJuego);

const preciosActualizados = Juegos.map((producto) => {
    return {
        ID: producto.ID,
        nombre: producto.nombre,
        precio:Math.round(producto.precio * 1.21),
        thumbnail: producto.thumbnail
    }
});



const NameUserIndex = document.querySelector('#IndexName');
NameUserIndex.innerHTML = 'Bienvenido ' + LoNameUser;

//     let opcion= prompt('elija el juego que quiere compar:\n1. Tlou \n2. Spiderman \n3. days gone');
//     function comprajuego(opcion){
//         let juego,precio
//         switch(opcion){
//             case '1':
//                 alert('El nombre del producto es ' + Juegos[0].nombre + ' Y El precio es de $' + preciosActualizados[0].precio);
//                 break;
//             case '2':
//                 alert('El nombre del producto es ' + Juegos[1].nombre + ' Y El precio es de $' + preciosActualizados[1].precio);
//                 break;
//             case '3':
//                 alert('El nombre del producto es ' + Juegos[2].nombre + ' Y El precio es de $' + preciosActualizados[2].precio);
//                 break;
//             default:
//                 if (opcion===""){
//                     alert('No ingresaste ningun valor');
//                 }else{
//                     alert('No ingresaste el valor de un juego valido');
//                     };
//                     do{
//                         opcion=prompt('elija nuevamente el juego que quiere compar:\n1. Tlou \n2. Spiderman \n3. days gone')
//                         if (opcion==1){
//                             alert('El nombre del producto es ' + Juegos[0].nombre + ' Y El precio es de $' + preciosActualizados[0].precio);
//                             break;
//                         }else if (opcion==2){
//                             alert('El nombre del producto es ' + Juegos[1].nombre + ' Y El precio es de $' + preciosActualizados[1].precio);
//                             break;
//                         } else if (opcion==3){
//                             alert('El nombre del producto es ' + Juegos[2].nombre + ' Y El precio es de $' + preciosActualizados[2].precio);
//                             break;
//                         } else{
//                             alert('NO ES OPCION VALIDA')
//                         }
//                     } while(opcion==="" || opcion !==1 || opcion !== 3);
//         }
//         return {juego, precio};
//     }
// comprajuego(opcion);


const carrito = document.getElementById('carrito');
const productos = document.getElementById('productos');

function agregarAlCarrito(Name, Price) {
    const productoEnCarrito = document.createElement('p');
    productoEnCarrito.textContent = `${Name} - $${Price}`;
    carrito.appendChild(productoEnCarrito);
}


function agregarProducto(Name, Price, thumbnail) {
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-4', 'cardm');
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title TituloProduct">${Name}</h5>
            <img class="imgpro" src=${thumbnail} alt="Minecraft">
            <p class="card-text Price">Precio: $${Price}</p>
            <button class="btn btn-primary" onclick="agregarAlCarritoYMostrarAlert('${Name}', ${Price})">Agregar al Carrito</button>
        </div>
    `;
    productos.appendChild(card);
    fetch('js/main.js')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
}


function agregarAlCarritoYMostrarAlert(nombre, precio) {
    agregarAlCarrito(nombre, precio);
    mostrarSweetAlert();
    actualizarCarritoVisual();
}

function mostrarSweetAlert() {
    Swal.fire({
        title: "Perfecto!",
        text: "El juego a sido agregado al carrito con exito!",
        icon: "success"
    });
}

const carritoProductos = [];
function agregarAlCarrito(nombre, precio) {
    carritoProductos.push({ nombre, precio });
    console.log(`Agregado al carrito: ${nombre} - $${precio}`);
}

function actualizarCarritoVisual() {
    carrito.innerHTML = '';
    carritoProductos.forEach(producto => {
        const productoEnCarrito = document.createElement('p');
        productoEnCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
        carrito.appendChild(productoEnCarrito);
    });
}

agregarProducto(Juegos[0].nombre, preciosActualizados[0].precio, Juegos[0].thumbnail);
agregarProducto(Juegos[1].nombre, preciosActualizados[1].precio, Juegos[1].thumbnail);
agregarProducto(Juegos[2].nombre, preciosActualizados[2].precio,Juegos[2].thumbnail);
agregarProducto(nuevoJuego.nombre, nuevoJuego.precio, nuevoJuego.thumbnail);





