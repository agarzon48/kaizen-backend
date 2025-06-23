# kaizen-backend

```bash
# install dependencies:
npm install

# then run the project:
npm run dev

# you can test the project. Test files will be created in the
# dist folder and then executed with node:test
npm run test

# you can build it and run it from the bundle:
npm run build
npm start
```

---

## SPEC-001: API RESTful para gestión de tareas con Node.js y TypeScript

### Background

Esta prueba técnica surge en el contexto del desarrollo de un sistema interno de gestión de tareas (To-Do List) para una empresa. Con el objetivo de evaluar las habilidades técnicas de los desarrolladores backend, se propone la implementación de una API RESTful utilizando Node.js y TypeScript. La solución debe enfocarse en buenas prácticas de codificación, patrones de diseño (como Factory y Facade), y una estructura modular mantenible. No se requiere persistencia en una base de datos real, por lo que se debe simular el almacenamiento en memoria. El proyecto debe estar debidamente documentado para su presentación y discusión técnica.

### Requirements

#### Funcionales

##### *Must Have:*
- Crear una nueva tarea mediante POST `/tasks`, recibiendo `title` y `description`.
- Obtener todas las tareas mediante GET `/tasks`.
- Obtener una tarea por ID mediante GET `/tasks/:id`.
- Actualizar una tarea mediante PUT `/tasks/:id`, con `title`, `description` o ambos.
- Eliminar una tarea mediante DELETE `/tasks/:id`.
- Usar patrón de diseño Factory para creación de tareas.
- Usar patrón de diseño Facade para encapsular la lógica de negocio.
- Simulación de almacenamiento en memoria (sin base de datos).
- Validación: `title` obligatorio en creación y actualización.
- Manejo básico de errores, incluyendo respuesta 404 si no se encuentra la tarea.

##### *Should Have:*
- Estructura modular bajo las carpetas: `routes/`, `controllers/`, `facades/`, `factories/`, `services/`, `models/`, `utils/`.
- Código no bloqueante (uso correcto de async/await).
- Comentarios y organización que faciliten la comprensión del código.

##### *Could Have:*
- Documentación de endpoints usando Swagger o comentarios JSDoc.
- Tests unitarios con Jest u otro framework.
- Validaciones adicionales (e.g., longitud mínima de título).

##### *Won't Have (por ahora):*
- Persistencia en base de datos real.
- Autenticación o autorización de usuarios.

### Method

#### Arquitectura General

La solución utiliza una arquitectura modular en capas, con separación clara de responsabilidades.

#### Componentes

- **index.ts**: Punto de entrada, instancia el servidor Express y configura middleware y rutas.
- **/application**: Orquesta los casos de uso del dominio.
- **/domain**: Contiene los modelos y lógica de dominio puro
- **/infraestructure**: Implementa la interacción con recursos externos y detalles técnicos (**express**: In, **persistence**: Out)

### Implementation

#### Requisitos Previos

- Node.js (v18+ recomendado)
- npm

#### Pasos para Implementar

1. **Inicializar proyecto y dependencias**
2. **Configurar TypeScript**
3. **Estructurar el proyecto**
4. **Configurar script de ejecución**
5. **Ejecutar en modo desarrollo**
6. **Probar con Postman**

#### Milestones

1. **Inicialización del proyecto** *(30 minutos)*
- Crear proyecto con Node.js y TypeScript.
- Configurar `tsconfig.json` y scripts de desarrollo.
- Instalar dependencias necesarias.

2. **Diseño de modelo y estructura** *(15 minutos)*
- Crear estructura de carpetas base.
- Definir modelo `Task` e implementar `TaskService`.

3. **Implementación de lógica de negocio** *(20 minutos)*
- Implementar `TaskFactory` con validaciones.
- Crear `TaskFacade` y conectar con el servicio.

4. **Exposición de la API** *(15 minutos)*
- Implementar `TaskController`.
- Definir rutas y conectar con Express.

5. **Pruebas manuales con Postman** *(15 minutos)*
- Verificar funcionamiento de todos los endpoints.
- Validar respuestas, errores y formatos.

6. **Documentación del proyecto** *(opcional fuera del tiempo de prueba)*
- Escribir README con instrucciones.
- Documentar estructura, decisiones técnicas y patrones.

7. **Extras (opcional)** *(fuera del tiempo estimado)*
- Documentar API con Swagger.
- Agregar pruebas unitarias con Jest.
- Implementar validaciones adicionales.

### Gathering Results

Para evaluar si el sistema cumple con los objetivos planteados en la prueba técnica, se consideran los siguientes criterios:

#### Verificación Funcional

- Todos los endpoints funcionan correctamente mediante pruebas manuales con Postman.
- Las tareas se crean con ID único y fecha de creación.
- El sistema permite recuperar, actualizar y eliminar tareas correctamente.

#### Validación Técnica

- El `TaskController` delega completamente en el `TaskFacade`.
- El `TaskFacade` encapsula la lógica de negocio y se apoya en `TaskService` y `TaskFactory`.
- El modelo `Task` es consistente con los requisitos funcionales.
- El almacenamiento en memoria simula correctamente una base de datos con operaciones CRUD.

#### Calidad del Código

- Se respetan principios de diseño como separación de responsabilidades y modularidad.
- Se aplican patrones `Factory` y `Facade` adecuadamente.
- El código está escrito en TypeScript estricto, usando tipos explícitos y buenas prácticas.
- El proyecto es fácil de navegar y extender.

#### Presentación

- El sistema será presentado en una entrevista en vivo, donde se explicará:
  - Arquitectura general.
  - Justificación de decisiones técnicas.
  - Demostración de funcionalidad en Postman.
  - Discusión sobre principios SOLID y mejoras futuras.

#### Criterios de Éxito

- Todos los requisitos *Must Have* están implementados correctamente.
- El código es legible, escalable y testeable.
- El diseño refleja entendimiento y aplicación consciente de patrones de diseño.

---

Esta documentación se ha elaborado fuera del scope temporal otorgado. Para ver funcionalidades que han quedado pendientes, consultar sección [issues](https://github.com/agarzon48/kaizen-backend/issues) del repositorio.