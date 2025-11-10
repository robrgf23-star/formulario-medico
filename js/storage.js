// Manejo del almacenamiento local (simulación de BD con JSON)

const STORAGE_KEY = 'registrosMedicos';

// Obtener todos los registros
function getRegistros() {
    const registros = localStorage.getItem(STORAGE_KEY);
    return registros ? JSON.parse(registros) : [];
}

// Guardar un registro
function saveRegistro(registro) {
    const registros = getRegistros();
    
    // Si el registro ya existe (tiene id), actualizarlo
    if (registro.id) {
        const index = registros.findIndex(r => r.id === registro.id);
        if (index !== -1) {
            registros[index] = registro;
        }
    } else {
        // Nuevo registro
        registro.id = Date.now().toString(); // ID único basado en timestamp
        registro.fechaCreacion = new Date().toISOString();
        registros.push(registro);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
    return registro.id;
}

// Obtener un registro por ID
function getRegistroById(id) {
    const registros = getRegistros();
    return registros.find(registro => registro.id === id);
}

// Eliminar un registro
function deleteRegistro(id) {
    const registros = getRegistros();
    const filteredRegistros = registros.filter(registro => registro.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRegistros));
    return filteredRegistros.length !== registros.length; // Retorna true si se eliminó
}

// Generar un ID único
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}