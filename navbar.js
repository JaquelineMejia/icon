function desplazarRedireccionamiento(event) {
//     console.log(event);
//     var secciones = document.querySelectorAll("#preguntas, #soporte");
// console.log(secciones);
// for (var i = 0; i < secciones.length; i++) {
//     var seccion = secciones[i];
//     console.log(seccion);
//     var seccionTop = seccion.offsetTop/2;
//     var seccionBottom = seccionTop + seccion.offsetHeight/2;
//     console.log(seccionTop)
//     console.log(seccionBottom)
//       var duracion = 500
//           // Obtener el destino del enlace
//           var destino = '#preguntas'
//           var inicio = window.pageYOffset || document.documentElement.scrollTop;
//   var diferencia = destino - inicio;
//   var incremento = diferencia / (duracion / 16);
//   var tiempoInicial = Date.now();

//   function animarScroll() {
//     var tiempoActual = Date.now();
//     var tiempoPasado = tiempoActual - tiempoInicial;
//     var nuevoDesplazamiento = incremento * tiempoPasado + inicio;
//     console.log(nuevoDesplazamiento)
//     if (tiempoPasado < duracion) {
//       window.scrollTo(0, nuevoDesplazamiento);
//       requestAnimationFrame(animarScroll);
//     } else {
//       window.scrollTo(0, destino);
//     }
//   }

//   requestAnimationFrame(animarScroll);
//   }

}
// window.desplazarRedireccionamiento = desplazarRedireccionamiento;
document.addEventListener('DOMContentLoaded', function() {
var navbarPlaceholder = document.getElementById("navbar-placeholder");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      navbarPlaceholder.innerHTML = this.responseText;

      // Acceder al botón en navbar.html
      var items = document.getElementsByClassName("nav-item");
      console.log(items);
      for (var j = 0; j < items.length; j++) {
        items[j].querySelector("span").classList.remove("activar");
      }
      
      // Buscar el elemento de navegación correspondiente a la sección actual y aplicar la clase activa
      var elementoNavegacion = document.querySelector('a[href="mapa.html"]');
      console.log(elementoNavegacion);
      elementoNavegacion.querySelector("span").classList.add("activar");
    
    }
  };
  xhttp.open("GET", "navbar.html", true);
  xhttp.send();
})
