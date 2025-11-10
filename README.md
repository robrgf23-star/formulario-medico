# formulario-medico
Formulario con múltiples páginas

# Sistema de Registro Médico - Formulario Web Multi-página

## Descripción

Sistema web para el registro de información médica de pacientes, organizado en un formulario multi-página que permite capturar datos personales, familiares, condiciones de salud pre-existentes e historial de internamientos.

## Características

-  **Formulario Multi-página** con navegación secuencial
-  **CRUD Completo** (Crear, Leer, Actualizar, Eliminar)
-  **Almacenamiento Local** usando JSON en localStorage
-  **Interfaz Responsive** adaptable a dispositivos móviles
-  **Validación de Formularios** en el frontend
-  **Indicador de Progreso** visual
-  **Menú Dinámico** contextual
-  **Estructura Modular** y escalable

## Estructura del Proyecto


formulario-medico/
├── index.html # Página principal con menú
├── css/
│ ├── styles.css # Estilos principales
│ └── form-styles.css # Estilos específicos del formulario
├── js/
│ ├── app.js # Lógica principal de la aplicación
│ ├── navigation.js # Control de navegación entre páginas
│ └── storage.js # Manejo del almacenamiento local (JSON)
├── pages/
│ ├── datos-personales.html # Página 1: Datos personales
│ ├── familiares.html # Página 2: Familiares
│ ├── condiciones-salud.html # Página 3: Condiciones pre-existentes
│ ├── internamientos.html # Página 4: Internamientos
│ └── resumen.html # Página 5: Resumen de datos
└── README.md



## Páginas del Formulario

### 1. Datos Personales
- Información básica del paciente (nombre, apellido, fecha de nacimiento, etc.)
- Campos obligatorios y opcionales
- Validación de formato

### 2. Familiares
- Registro de familiares directos
- Campos: Nombre, Parentesco, Edad
- Capacidad de agregar múltiples familiares

### 3. Condiciones de Salud Pre-Existentes
- Historial de enfermedades crónicas
- Campos: Enfermedad, Tiempo con la enfermedad, Detalles
- Múltiples condiciones por paciente

### 4. Internamientos Realizados
- Registro de hospitalizaciones previas
- Campos: Fecha, Centro Médico, Diagnóstico
- Historial completo de internamientos

### 5. Resumen
- Vista consolidada de toda la información
- Confirmación antes de guardar definitivamente
- Opciones de edición por sección

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos responsive y modernos
- **JavaScript Vanilla**: Lógica de aplicación
- **LocalStorage**: Persistencia de datos
- **JSON**: Formato de almacenamiento

## Instalación y Uso

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, pero recomendado)

### Instalación Local
1. Clonar o descargar el repositorio
2. Abrir `index.html` en un navegador web
3. O usar un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx http-server