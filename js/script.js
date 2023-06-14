$(document).ready(function() {

    const urlDocentes = 'php/docentes.php';
    const urlCursos = 'php/cursos.php';
    cargarListaDocente();
    cargarListaCursos();

    // Enviar formulario de agregar docente
    $('#docenteForm').submit(function(e) {
        e.preventDefault();

        let mensaje = $('#mss');
        const formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: urlDocentes,
            data: formData,
            success: (response) => {
                const htmlSuccess = `
                    <div class="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">
                    ${response}
                    </div>
                `;
                mensaje.html(htmlSuccess);

                // Limpiar el formulario
                $('#docenteForm')[0].reset();
                cargarListaDocente()
                
                setTimeout(() => mensaje.remove(), 2000);
            }, 
            error: () => {
                const htmlError = `
                    <div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                        Se produjo un error al registrar
                    </div>
                `;
                mensaje.html(htmlError);
            }
        });

    });

    // Cargar docentes

    function cargarListaDocente() {
        $.ajax({
            type: 'GET',
            url: urlDocentes,
            dataType: "json",
            success: (response) => {
                let listaDocentes = $("#listaDocentes");
                listaDocentes.empty();

                if (response.length > 0) {
                    const table = $(`
                       <table class="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Correo Electrónico</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${response.map(docente => `
                            <tr>
                              <td>${docente.id}</td>
                              <td>${docente.nombre}</td>
                              <td>${docente.especialidad}</td>
                              <td>${docente.correo}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    `);
                    listaDocentes.append(table);
                } else {
                    listaDocentes.text("No se encontraron docentes");
                }
            },
            error: (error) => {
                alert("Error al cargar la lista docentes: " + error);
            }
        });
    }


    $.ajax({
        url: urlDocentes,
        method: "GET",
        dataType: "json",
        success: function (response) {
            let options = [];
            if (response.length > 0) {
                options = response
                    .map((docente) => `<option value='${docente.id}'> ${docente.id} - ${docente.nombre}</option>`)
            }
            options.unshift(`<option selected disabled> seleccionar</option>`);
            $("#docenteCurso").html(options.join(''));
        },
        error: function () {
            alert("Error al cargar la lista de docentes");
        }
    });

    // Agregar curso
    $("#agregarCursoForm").submit(function(event) {
        event.preventDefault();

        var nombreCurso = $("#nombreCurso").val();
        var descripcionCurso = $("#descripcionCurso").val();
        var docenteCurso = $("#docenteCurso").val();

        $.ajax({
            url: urlCursos,
            method: "POST",
            data: {
                nombreCurso: nombreCurso,
                descripcionCurso: descripcionCurso,
                docenteCurso: docenteCurso
            },
            success: function(response) {
                alert(response);
                $("#agregarCursoForm")[0].reset();
                cargarListaCursos();
            },
            error: function() {
                alert("Error al agregar el curso");
            }
        });
    });

    // Cargar lista de cursos
    function cargarListaCursos() {
        $.ajax({
            url: urlCursos,
            method: "GET",
            dataType: "json",
            success: function(response) {
                let listaCursos = response.map(function(curso) {
                    return `
                     <div class="card curso mb-1">
                      <div class="card-body">
                        <h4 class="card-title">${curso.nombre}</h4>
                        <p class="card-text">${curso.descripcion}</p>
                        <p class="card-text">Docente: ${curso.docente}</p>
                      </div>
                    </div>
                  `;
                }).join('');
                $("#listaCursos").html(listaCursos);

            },
            error: function() {
                alert("Error al cargar la lista de cursos");
            }
        });
    }

});