document.getElementById('formulario-busqueda').addEventListener('submit', function(event) {
    event.preventDefault();
    buscar();
});

document.getElementById('tabla').addEventListener('change', function() {
    actualizarCampoOptions();
});

function actualizarCampoOptions() {
    var tablaSeleccionada = document.getElementById('tabla').value;
    var campoSelect = document.getElementById('campo');

    campoSelect.innerHTML = '';

    var options;
    if (tablaSeleccionada === 'Movie') {
        options = ['MovieID', 'Title', 'Year', 'Score', 'Votes'];
    } else if (tablaSeleccionada === 'Actor') {
        options = ['ActorId', 'Name'];
    } else if (tablaSeleccionada === 'Casting') {
        options = ['MovieID', 'ActorId', 'Ordinal'];
    }

    options.forEach(optionValue => {
        var option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;
        campoSelect.appendChild(option);
    });
}