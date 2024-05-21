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

function buscar() {
    var formData = new FormData(document.getElementById('formulario-busqueda'));
    
    fetch('/buscar', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        var resultado = document.getElementById('resultado');
        resultado.innerHTML = '';
    
        if (data.error) {
            resultado.innerHTML = 'Error: ' + data.error;
        } else {
            var table = document.createElement('table');
            table.className = 'result-table';
            
            data.forEach(item => {
                var row = document.createElement('tr');
                Object.values(item).forEach(value => {
                    var td = document.createElement('td');
                    td.textContent = value;
                    row.appendChild(td);
                });
                table.appendChild(row);
            });
    
            resultado.appendChild(table);
        }
    })
    .catch(error => console.error('Error:', error));
}