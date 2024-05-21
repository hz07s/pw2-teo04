document.getElementById('formulario-busqueda').addEventListener('submit', function(event) {
    event.preventDefault();
    buscar();
});

document.getElementById('tabla').addEventListener('change', function() {
    actualizarCampoOptions();
});
