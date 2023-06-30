// Import stylesheets
//import './style.css';
document.addEventListener('DOMContentLoaded', function() {
  // Aquí puedes colocar tu código JavaScript
  const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-content');
// Obtener todas las secciones
var secciones = document.querySelectorAll("#preguntas, #soporte, #inicio");
console.log(secciones);
// Obtener todos los elementos de navegación
var items = document.getElementsByClassName("nav-item");

// Función para verificar qué sección está visible en el viewport
function verificarSeccionVisible() {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // Iterar sobre todas las secciones
  for (var i = 0; i < secciones.length; i++) {
    var seccion = secciones[i];
    
    var seccionTop = seccion.offsetTop/1.2;
    var seccionBottom = seccionTop + seccion.offsetHeight/1.2;
    console.log(seccionTop)
    console.log(seccionBottom)
    // Verificar si la sección está visible en el viewport
    if (scrollTop >= seccionTop && scrollTop < seccionBottom) {
      // Eliminar clase activa de todos los elementos de navegación
      for (var j = 0; j < items.length; j++) {
        items[j].querySelector("span").classList.remove("activar");
      }
      
      // Buscar el elemento de navegación correspondiente a la sección actual y aplicar la clase activa
      var elementoNavegacion = document.querySelector('a[href="#' + seccion.id + '"]');
      console.log(elementoNavegacion);
      elementoNavegacion.querySelector("span").classList.add("activar");
      break;
    }
  }
}

// Función para desplazamiento suave
function desplazamientoSuave(destino, duracion) {
  var inicio = window.pageYOffset || document.documentElement.scrollTop;
  var diferencia = destino - inicio;
  var incremento = diferencia / (duracion / 16);
  var tiempoInicial = Date.now();

  function animarScroll() {
    var tiempoActual = Date.now();
    var tiempoPasado = tiempoActual - tiempoInicial;
    var nuevoDesplazamiento = incremento * tiempoPasado + inicio;
    console.log(nuevoDesplazamiento)
    if (tiempoPasado < duracion) {
      window.scrollTo(0, nuevoDesplazamiento);
      requestAnimationFrame(animarScroll);
    } else {
      window.scrollTo(0, destino);
    }
  }

  requestAnimationFrame(animarScroll);
}

// Agregar eventos de clic a los elementos de navegación
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function(e) {
    // Prevenir comportamiento por defecto del enlace
    e.preventDefault();

    // Obtener el destino del enlace
    var destino = this.querySelector("a").getAttribute("href");
    console.log(destino)
    if(destino == 'mapa.html'){
      window.location.href = "mapa.html";
    }else{
      desplazamientoSuave(document.querySelector(destino).offsetTop - (window.innerHeight - document.querySelector(destino).offsetHeight)/1.4 , 500);
    }
    // Desplazamiento suave al destino
    
    
    // Eliminar clase activa de todos los elementos de navegación
    for (var j = 0; j < items.length; j++) {
      items[j].querySelector("span").classList.remove("activar");
    }
    
    // Aplicar clase activa solo al span del elemento clicado
    this.querySelector("span").classList.add("activar");
  });
}

// Verificar la sección visible al cargar la página y en eventos de scroll
window.addEventListener("DOMContentLoaded", function() {
  verificarSeccionVisible();
});
window.addEventListener("scroll", function() {
  verificarSeccionVisible();
});

var botones = document.getElementsByClassName("pregunta");
for (var i = 0; i < botones.length; i++) {
  botones[i].addEventListener("click", function() {
    var dataTarget = this.getAttribute("data-target");
    var colapsable = document.querySelector(dataTarget);

    // Obtener todos los colapsables abiertos, excepto el actual
    var openColapsables = document.querySelectorAll(".collapse.show");
    for (var k = 0; k < openColapsables.length; k++) {
      if (openColapsables[k] !== colapsable) {
        openColapsables[k].classList.remove("show");
        openColapsables[k].classList.remove("in");
        // Restaurar el estado y la apariencia del botón correspondiente
        var button = document.querySelector('[data-target="' + "#" + openColapsables[k].id + '"]');
        button.classList.remove("color-clic");
        button.classList.remove("no-hover");
        var imgElement = button.querySelector(".imgChange");
        imgElement.src = "iconMasVerde.svg";
      }
    }

    // Alternar el estado del botón actual y expandir/contraer la información
    this.classList.toggle("color-clic");
    colapsable.classList.toggle("show");
    this.classList.toggle("no-hover");
    var imgElement = this.querySelector(".imgChange");
    if (colapsable.classList.contains("show")) {
      imgElement.src = "iconMasBlanco.svg";
    } else {
      imgElement.src = "iconMasVerde.svg";
    }
  });
}
const estrellas = document.getElementsByName('estrellas');
  let valorSeleccionado;

  estrellas.forEach(function(estrella) {
    estrella.addEventListener('click', function() {
      valorSeleccionado = this.value;
      console.log('Valor seleccionado:', valorSeleccionado);
    });
  });
// Obtener una referencia al formulario
const form = document.getElementById('myForm');

// Agregar un evento de escucha al formulario para capturar el envío
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío normal del formulario

  // Obtener los valores de los campos del formulario
  const email = document.getElementById('email').value;
  const opinion = document.getElementById('opinion').value;
  console.log(email);
  console.log(opinion);
  const data = {
    nombre:valorSeleccionado,
    email:email,
    opinion:opinion
  };
  // Realizar la solicitud HTTP POST al servidor Flask
  fetch('http://127.0.0.1:5000/guardar', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(data => {
    // Manejar la respuesta del servidor
    form.reset();
    alert(data)
    console.log(data); // Puedes hacer algo con la respuesta, como mostrar un mensaje de éxito
  })
  .catch(error => {
    alert(error)
    console.error('Error:', error);
  });
});
});
