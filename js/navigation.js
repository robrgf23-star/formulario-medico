// Control de navegación entre páginas

let currentPage = 'welcome';
let currentRegistroId = null;

// Navegar a una página específica
function navigateTo(page, registroId = null) {
    // Ocultar contenido actual
    document.getElementById('content').innerHTML = '';
    
    // Cargar la nueva página
    fetch(`pages/${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Página no encontrada');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            currentPage = page;
            currentRegistroId = registroId;
            
            // Actualizar menú activo
            updateActiveMenu();
            
            // Si estamos editando, cargar los datos del registro
            if (registroId && page !== 'resumen') {
                loadRegistroData(registroId, page);
            } else if (page === 'resumen' && registroId) {
                showResumen(registroId);
            }
            
            // Inicializar componentes específicos de la página
            initPageComponents();
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
            document.getElementById('content').innerHTML = `
                <div class="card">
                    <h2>Error</h2>
                    <p>No se pudo cargar la página solicitada.</p>
                    <button onclick="navigateTo('welcome')" class="btn btn-primary">Volver al inicio</button>
                </div>
            `;
        });
}

// Actualizar el menú activo
function updateActiveMenu() {
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick').includes(currentPage)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Inicializar componentes específicos de cada página
function initPageComponents() {
    switch(currentPage) {
        case 'datos-personales':
            initDatosPersonales();
            break;
        case 'familiares':
            initFamiliares();
            break;
        case 'condiciones-salud':
            initCondicionesSalud();
            break;
        case 'internamientos':
            initInternamientos();
            break;
        case 'resumen':
            // Ya se maneja en navigateTo
            break;
    }
}

// Cargar datos de un registro para edición
function loadRegistroData(registroId, page) {
    const registro = getRegistroById(registroId);
    if (!registro) return;
    
    // Llenar formulario según la página
    switch(page) {
        case 'datos-personales':
            document.getElementById('nombre').value = registro.datosPersonales?.nombre || '';
            document.getElementById('apellido').value = registro.datosPersonales?.apellido || '';
            document.getElementById('fechaNacimiento').value = registro.datosPersonales?.fechaNacimiento || '';
            document.getElementById('genero').value = registro.datosPersonales?.genero || '';
            document.getElementById('telefono').value = registro.datosPersonales?.telefono || '';
            document.getElementById('email').value = registro.datosPersonales?.email || '';
            document.getElementById('direccion').value = registro.datosPersonales?.direccion || '';
            break;
        // Los demás casos se manejarían en sus respectivos archivos de inicialización
    }
}

// Mostrar resumen de un registro
function showResumen(registroId) {
    const registro = getRegistroById(registroId);
    if (!registro) return;
    
    // Esta función se implementará en app.js
    displayResumen(registro);
}