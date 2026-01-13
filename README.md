# 💻 Frontend - Equipment Manager UI

Interfaz de usuario desarrollada con **Angular 21** para la gestión y validación de inventario. Este proyecto implementa una arquitectura escalable basada en **Features** y **Shared Resources**, consumiendo la API REST de `equipment-manager-api`.

## 🛠 Tech Stack & Arquitectura

* **Framework:** Angular 21 (Latest)
* **Reactividad:** Signals, Computed Signals & Resource API (`rxResource`).
* **UI Library:** Angular Material.
* **Estilos:** SCSS & Flexbox/Grid layouts.
* **Patrones de Diseño:**
    * **Standalone Components:** 100% libre de NgModules.
    * **Smart vs Dumb Components:** Separación estricta entre lógica (Dashboard) y presentación (Tabla).
    * **Facade Pattern:** Lógica de negocio encapsulada en `EquipmentLogicService`.
    * **Feature-Based Structure:** Organización modular por dominios funcionales.

---

## 📋 Prerrequisitos

* Node.js v18 o superior.
* Navegador moderno.
* **Backend:** El proyecto `equipment-manager-api` debe estar corriendo en el puerto `3000`.

---

## ⚙️ Instalación y Ejecución

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo:**
    ```bash
    npm start
    ```
    
3.  **Acceder:**
    Visita [http://localhost:4200](http://localhost:4200).

---

## 🏗 Estructura del Proyecto

El proyecto sigue una arquitectura limpia donde `AppComponent` actúa solo como orquestador (Shell), delegando la funcionalidad a módulos específicos.

```text
src/app/
├── app.component.ts           # Shell: Contiene solo el RouterOutlet
├── app.routes.ts              # Configuración de Lazy Loading y rutas
│
├── components/                # Features (Vistas Principales)
│   └── dashboard/             # [SMART Component]
│       ├── dashboard.component.ts   # Orquesta el servicio y la vista
│       └── dashboard.component.html # Contiene el buscador y la tabla
│
└── shared/                    # Recursos Reutilizables
    ├── components/
    │   └── equipment-table/   # [DUMB Component] Solo recibe datos y renderiza
    ├── interfaces/
    │   └── equipment.interface.ts
    └── services/
        ├── equipment.service.ts       # Comunicación HTTP pura (Global)
        └── equipment-logic.service.ts # Facade: Gestión de estado reactivo

```

---

## 🧩 Características Clave

### 1. Validación Reactiva (Resource API)

Se utiliza la primitiva `resource` de Angular para gestionar la carga asíncrona de datos desde NestJS. Esto elimina la necesidad de gestionar suscripciones manuales (`subscribe`) y simplifica el manejo de estados `isLoading` y `error`.

### 2. Filtrado "Smart"

* **Input:** El usuario pega múltiples códigos (estilo Excel).
* **Procesamiento:** El backend realiza una búsqueda optimizada (`ILIKE`) y devuelve las coincidencias.
* **Visualización:** El frontend utiliza `Computed Signals` para actualizar la tabla instantáneamente sin mutar el array original de datos.

### 3. Tabla Responsiva y Reutilizable

El componente `<app-equipment-table>` ubicado en `shared` es agnóstico a la lógica de negocio.

* Implementa **Scroll Horizontal** inteligente con CSS para dispositivos móviles.
* Utiliza sombras CSS personalizadas para evitar conflictos de apilamiento (z-index) con Angular Material.

---