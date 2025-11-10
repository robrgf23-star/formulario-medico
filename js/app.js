// Lógica principal de la aplicación

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Cargar menú de navegación
    loadNavigation();
    
    // Mostrar página de bienvenida por defecto
    showWelcome();
}

// Cargar menú de navegación
function loadNavigation() {
    const navHTML = `
        <ul>
            <li><a href="#" onclick="navigateTo('datos-personales')">Datos Personales</a></li>
            <li><a href="#" onclick="navigateTo('familiares')">Familiares</a></li>
            <li><a href="#" onclick="navigateTo('condiciones-salud')">Condiciones de Salud</a></li>
            <li><a href="#" onclick="navigateTo('internamientos')">Internamientos</a></li>
            <li><a href="#" onclick="navigateTo('resumen')">Resumen</a></li>
        </ul>
    `;
    document.getElementById('main-nav').innerHTML = navHTML;
}

// Mostrar página de bienvenida
function showWelcome() {
    // Ya está en el HTML inicial
}

// Mostrar lista de registros
function showRegistros() {
    const registros = getRegistros();
    const registrosList = document.getElementById('registros-list');
    
    if (registros.length === 0) {
        registrosList.innerHTML = `
            <div class="card">
                <h3>No hay registros guardados</h3>
                <p>Comience creando un nuevo registro médico.</p>
            </div>
        `;
    } else {
        let html = '<div class="card"><h3>Registros Guardados</h3><div class="table-responsive"><table class="table"><thead><tr><th>Nombre</th><th>Fecha de Creación</th><th>Acciones</th></tr></thead><tbody>';
        
        registros.forEach(registro => {
            const fecha = new Date(registro.fechaCreacion).toLocaleDateString();
            html += `
                <tr>
                    <td>${registro.datosPersonales?.nombre || 'N/A'} ${registro.datosPersonales?.apellido || ''}</td>
                    <td>${fecha}</td>
                    <td>
                        <button onclick="editRegistro('${registro.id}')" class="btn btn-primary btn-sm">Editar</button>
                        <button onclick="viewRegistro('${registro.id}')" class="btn btn-secondary btn-sm">Ver</button>
                        <button onclick="deleteRegistroConfirm('${registro.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div></div>';
        registrosList.innerHTML = html;
    }
    
    registrosList.style.display = 'block';
}

// Editar un registro existente
function editRegistro(id) {
    navigateTo('datos-personales', id);
}

// Ver un registro completo
function viewRegistro(id) {
    navigateTo('resumen', id);
}

// Confirmar eliminación de registro
function deleteRegistroConfirm(id) {
    if (confirm('¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.')) {
        if (deleteRegistro(id)) {
            alert('Registro eliminado correctamente');
            showRegistros(); // Actualizar la lista
        } else {
            alert('Error al eliminar el registro');
        }
    }
}

// Guardar datos de la página actual
function savePageData(page) {
    let registroData = {};
    
    switch(page) {
        case 'datos-personales':
            registroData = getDatosPersonales();
            break;
        case 'familiares':
            registroData = getFamiliares();
            break;
        case 'condiciones-salud':
            registroData = getCondicionesSalud();
            break;
        case 'internamientos':
            registroData = getInternamientos();
            break;
    }
    
    // Si estamos editando un registro existente
    if (currentRegistroId) {
        const registroExistente = getRegistroById(currentRegistroId);
        registroData = {...registroExistente, ...registroData};
        registroData.id = currentRegistroId;
    }
    
    const registroId = saveRegistro(registroData);
    currentRegistroId = registroId;
    
    return true;
}

// Navegar a la siguiente página
function nextPage(current, next) {
    if (savePageData(current)) {
        navigateTo(next, currentRegistroId);
    }
}

// Mostrar resumen completo
function displayResumen(registro) {
    const content = document.getElementById('content');
    
    let html = `
        <div class="form-page">
            <h2 class="section-title">Resumen del Registro Médico</h2>
            
            <div class="card">
                <h3>Datos Personales</h3>
                ${displayDatosPersonalesResumen(registro.datosPersonales)}
            </div>
            
            <div class="card">
                <h3>Familiares</h3>
                ${displayFamiliaresResumen(registro.familiares)}
            </div>
            
            <div class="card">
                <h3>Condiciones de Salud Pre-Existentes</h3>
                ${displayCondicionesSaludResumen(registro.condicionesSalud)}
            </div>
            
            <div class="card">
                <h3>Internamientos Realizados</h3>
                ${displayInternamientosResumen(registro.internamientos)}
            </div>
            
            <div class="page-navigation">
                <button onclick="navigateTo('internamientos', '${registro.id}')" class="btn btn-secondary">Anterior</button>
                <div>
                    <button onclick="editRegistro('${registro.id}')" class="btn btn-primary">Editar Registro</button>
                    <button onclick="finalizeRegistro()" class="btn btn-success">Finalizar</button>
                </div>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
}

// Funciones auxiliares para mostrar resúmenes
function displayDatosPersonalesResumen(datos) {
    if (!datos) return '<p class="empty-message">No se han registrado datos personales</p>';
    
    return `
        <div class="form-row">
            <div><strong>Nombre:</strong> ${datos.nombre || ''} ${datos.apellido || ''}</div>
            <div><strong>Fecha de Nacimiento:</strong> ${datos.fechaNacimiento || 'No especificada'}</div>
            <div><strong>Género:</strong> ${datos.genero || 'No especificado'}</div>
            <div><strong>Teléfono:</strong> ${datos.telefono || 'No especificado'}</div>
            <div><strong>Email:</strong> ${datos.email || 'No especificado'}</div>
            <div><strong>Dirección:</strong> ${datos.direccion || 'No especificada'}</div>
        </div>
    `;
}

function displayFamiliaresResumen(familiares) {
    if (!familiares || familiares.length === 0) {
        return '<p class="empty-message">No se han registrado familiares</p>';
    }
    
    let html = '<div class="dynamic-list">';
    familiares.forEach((familiar, index) => {
        html += `
            <div class="list-item">
                <div class="list-item-content">
                    <div><strong>Nombre:</strong> ${familiar.nombre}</div>
                    <div><strong>Parentesco:</strong> ${familiar.parentesco}</div>
                    <div><strong>Edad:</strong> ${familiar.edad}</div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    return html;
}

function displayCondicionesSaludResumen(condiciones) {
    if (!condiciones || condiciones.length === 0) {
        return '<p class="empty-message">No se han registrado condiciones de salud pre-existentes</p>';
    }
    
    let html = '<div class="dynamic-list">';
    condiciones.forEach((condicion, index) => {
        html += `
            <div class="list-item">
                <div class="list-item-content">
                    <div><strong>Enfermedad:</strong> ${condicion.enfermedad}</div>
                    <div><strong>Tiempo con la enfermedad:</strong> ${condicion.tiempo}</div>
                    ${condicion.detalle ? `<div><strong>Detalles:</strong> ${condicion.detalle}</div>` : ''}
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    return html;
}

function displayInternamientosResumen(internamientos) {
    if (!internamientos || internamientos.length === 0) {
        return '<p class="empty-message">No se han registrado internamientos</p>';
    }
    
    let html = '<div class="dynamic-list">';
    internamientos.forEach((internamiento, index) => {
        html += `
            <div class="list-item">
                <div class="list-item-content">
                    <div><strong>Fecha:</strong> ${internamiento.fecha}</div>
                    <div><strong>Centro Médico:</strong> ${internamiento.centroMedico}</div>
                    <div><strong>Diagnóstico:</strong> ${internamiento.diagnostico}</div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    return html;
}

// Finalizar registro
function finalizeRegistro() {
    alert('Registro médico completado exitosamente');
    navigateTo('welcome');
}