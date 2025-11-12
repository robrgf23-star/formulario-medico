// navigation.js - Funciones de navegación CORREGIDAS

console.log('navigation.js cargado correctamente');

let currentPage = 'welcome';
let currentRegistroId = null;

// Función principal de navegación
function navigateTo(page, registroId = null) {
    console.log('Navegando a:', page);
    
    const content = document.getElementById('content');
    if (!content) {
        console.error('Elemento content no encontrado');
        return;
    }
    
    currentPage = page;
    currentRegistroId = registroId;
    
    // Actualizar menú activo
    updateActiveMenu();
    
    // Cargar contenido según la página
    switch(page) {
        case 'welcome':
            showWelcomePage();
            break;
        case 'datos-personales':
            showDatosPersonalesPage();
            break;
        case 'familiares':
            showFamiliaresPage();
            break;
        case 'condiciones-salud':
            showCondicionesSaludPage();
            break;
        case 'internamientos':
            showInternamientosPage();
            break;
        case 'resumen':
            showResumenPage();
            break;
        default:
            showWelcomePage();
    }
}

// Actualizar menú activo
function updateActiveMenu() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    nav.innerHTML = `
        <ul>
            <li><a href="#" onclick="navigateTo('datos-personales')" class="${currentPage === 'datos-personales' ? 'active' : ''}">Datos Personales</a></li>
            <li><a href="#" onclick="navigateTo('familiares')" class="${currentPage === 'familiares' ? 'active' : ''}">Familiares</a></li>
            <li><a href="#" onclick="navigateTo('condiciones-salud')" class="${currentPage === 'condiciones-salud' ? 'active' : ''}">Condiciones de Salud</a></li>
            <li><a href="#" onclick="navigateTo('internamientos')" class="${currentPage === 'internamientos' ? 'active' : ''}">Internamientos</a></li>
            <li><a href="#" onclick="navigateTo('resumen')" class="${currentPage === 'resumen' ? 'active' : ''}">Resumen</a></li>
        </ul>
    `;
}

// Página de bienvenida
function showWelcomePage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <section id="welcome">
            <h2>Bienvenido al Sistema de Registro Médico</h2>
            <p>Seleccione una opción del menú para comenzar</p>
            
            <div class="dashboard">
                <div class="card">
                    <h3>Nuevo Registro</h3>
                    <p>Cree un nuevo registro médico completo</p>
                    <button onclick="navigateTo('datos-personales')" class="btn btn-primary">Comenzar</button>
                </div>
                
                <div class="card">
                    <h3>Registros Existentes</h3>
                    <p>Ver, editar o eliminar registros guardados</p>
                    <button onclick="showRegistros()" class="btn btn-secondary">Ver Registros</button>
                </div>
            </div>
            
            <div id="registros-list" class="registros-container" style="display: none;"></div>
        </section>
    `;
}

// Página de datos personales - VERSIÓN SIMPLIFICADA Y FUNCIONAL
function showDatosPersonalesPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="form-page">
            <div class="progress-indicator">
                <div class="progress-step active">
                    <div class="step-number">1</div>
                    <div class="step-label">Datos Personales</div>
                </div>
                <div class="progress-step">
                    <div class="step-number">2</div>
                    <div class="step-label">Familiares</div>
                </div>
                <div class="progress-step">
                    <div class="step-number">3</div>
                    <div class="step-label">Condiciones Salud</div>
                </div>
                <div class="progress-step">
                    <div class="step-number">4</div>
                    <div class="step-label">Internamientos</div>
                </div>
                <div class="progress-step">
                    <div class="step-number">5</div>
                    <div class="step-label">Resumen</div>
                </div>
            </div>

            <h2 class="section-title">Datos Personales</h2>
            
            <form id="datos-personales-form">
                <div class="card">
                    <div class="form-section">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="nombre">Nombre *</label>
                                <input type="text" id="nombre" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="apellido">Apellido *</label>
                                <input type="text" id="apellido" class="form-control" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="fechaNacimiento">Fecha de Nacimiento *</label>
                                <input type="date" id="fechaNacimiento" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="genero">Género</label>
                                <select id="genero" class="form-control">
                                    <option value="">Seleccionar</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                    <option value="prefiero-no-decir">Prefiero no decir</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="telefono">Teléfono</label>
                                <input type="tel" id="telefono" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" class="form-control">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <textarea id="direccion" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                
                <div class="page-navigation">
                    <button type="button" onclick="navigateTo('welcome')" class="btn btn-secondary">Cancelar</button>
                    <button type="button" onclick="guardarDatosPersonales()" class="btn btn-primary">Siguiente</button>
                </div>
            </form>
        </div>
    `;
    
    // Inicializar el formulario - VERSIÓN SIMPLIFICADA
    inicializarFormularioDatosPersonales();
}

// Función simplificada para inicializar el formulario
function inicializarFormularioDatosPersonales() {
    const form = document.getElementById('datos-personales-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarDatosPersonales();
        });
    }
    console.log('Formulario de datos personales inicializado');
}

// Función para guardar datos personales y avanzar
function guardarDatosPersonales() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    
    // Validación básica
    if (!nombre || !apellido || !fechaNacimiento) {
        alert('Por favor complete los campos obligatorios: Nombre, Apellido y Fecha de Nacimiento');
        return;
    }
    
    console.log('Datos personales guardados:', { nombre, apellido, fechaNacimiento });
    
    // Aquí guardaríamos en storage (por ahora solo avanzamos)
    navigateTo('familiares');
}

// Funciones para otras páginas (simplificadas)
function showFamiliaresPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="form-page">
            <h2 class="section-title">Familiares</h2>
            <div class="card">
                <p>Formulario de familiares - En desarrollo</p>
                <div class="page-navigation">
                    <button type="button" onclick="navigateTo('datos-personales')" class="btn btn-secondary">Anterior</button>
                    <button type="button" onclick="navigateTo('condiciones-salud')" class="btn btn-primary">Siguiente</button>
                </div>
            </div>
        </div>
    `;
}

function showCondicionesSaludPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="form-page">
            <h2 class="section-title">Condiciones de Salud Pre-Existentes</h2>
            <div class="card">
                <p>Formulario de condiciones de salud - En desarrollo</p>
                <div class="page-navigation">
                    <button type="button" onclick="navigateTo('familiares')" class="btn btn-secondary">Anterior</button>
                    <button type="button" onclick="navigateTo('internamientos')" class="btn btn-primary">Siguiente</button>
                </div>
            </div>
        </div>
    `;
}

function showInternamientosPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="form-page">
            <h2 class="section-title">Internamientos Realizados</h2>
            <div class="card">
                <p>Formulario de internamientos - En desarrollo</p>
                <div class="page-navigation">
                    <button type="button" onclick="navigateTo('condiciones-salud')" class="btn btn-secondary">Anterior</button>
                    <button type="button" onclick="navigateTo('resumen')" class="btn btn-primary">Siguiente</button>
                </div>
            </div>
        </div>
    `;
}

function showResumenPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div class="form-page">
            <h2 class="section-title">Resumen del Registro</h2>
            <div class="card">
                <p>Resumen de todos los datos - En desarrollo</p>
                <div class="page-navigation">
                    <button type="button" onclick="navigateTo('internamientos')" class="btn btn-secondary">Anterior</button>
                    <button type="button" onclick="finalizarRegistro()" class="btn btn-success">Finalizar Registro</button>
                </div>
            </div>
        </div>
    `;
}

function finalizarRegistro() {
    alert('¡Registro médico completado exitosamente!');
    navigateTo('welcome');
}

// Función para mostrar registros existentes
function showRegistros() {
    const registrosList = document.getElementById('registros-list');
    if (!registrosList) return;
    
    registrosList.innerHTML = `
        <div class="card">
            <h3>Registros Guardados</h3>
            <p>Actualmente no hay registros guardados.</p>
            <p>Comience creando un nuevo registro médico.</p>
            <button onclick="navigateTo('datos-personales')" class="btn btn-primary">Crear Nuevo Registro</button>
        </div>
    `;
    registrosList.style.display = 'block';
}

// Hacer TODAS las funciones disponibles globalmente
window.navigateTo = navigateTo;
window.guardarDatosPersonales = guardarDatosPersonales;
window.finalizarRegistro = finalizarRegistro;
window.showRegistros = showRegistros;