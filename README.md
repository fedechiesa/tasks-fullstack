# 📝 Tasks FullStack

Aplicación **Full Stack (Node + React)** para gestionar tareas con persistencia local en JSON y API propia desarrollada con **Express**.

---

## 🚀 Tecnologías

**Backend:**
- Node.js + Express  
- CORS  
- UUID (para IDs únicas)  
- FS (persistencia en archivo JSON)

**Frontend:**
- React + Vite  
- Bootstrap 5  
- React Icons  

**Arquitectura:**
- API REST  
- Fetch API  
- Componentes modulares con estado propio  

---

## ⚙️ Instalación

### 🔹 Backend
1. Entrar a la carpeta del servidor:
   ```bash
   cd server
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor:
   ```bash
   npm start
   ```
   El backend corre en 👉 [http://127.0.0.1:4000](http://127.0.0.1:4000)

---

### 🔹 Frontend
1. Entrar a la carpeta del cliente:
   ```bash
   cd client
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el proyecto:
   ```bash
   npm run dev
   ```
   El frontend corre en 👉 [http://localhost:5173](http://localhost:5173)

---

## 🧠 Funcionalidades

✅ Crear tareas nuevas  
✅ Marcar como hechas / pendientes  
✅ Editar título  
✅ Eliminar tarea individual  
✅ Filtrar por estado (todas / pendientes / hechas)  
✅ Eliminar todas las tareas hechas (borrado masivo)  
✅ Feedback visual (spinners, alerts y toasts)  
✅ Modal de confirmación al eliminar  
✅ Diseño moderno con Bootstrap 5  

---

## 🗂️ Estructura del Proyecto

```
tareas-fullstack/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── Toast.jsx
│   │       ├── ConfirmModal.jsx
│   │       ├── TaskForm.jsx
│   │       ├── FilterBar.jsx
│   │       ├── TaskItem.jsx
│   │       └── TaskList.jsx
│   └── package.json
│
└── server/
    ├── data/
    │   └── tasks.json
    ├── index.js
    └── package.json
```

---

## 💻 Scripts útiles

**Frontend:**
```bash
npm run dev       # iniciar entorno de desarrollo
npm run build     # generar build para producción
```

**Backend:**
```bash
npm start         # iniciar servidor Express
```

---

## 🧾 Endpoints principales

| Método | Endpoint                  | Descripción |
|:--------|:--------------------------|:-------------|
| GET     | `/api/health`             | Estado del servidor |
| GET     | `/api/tasks`              | Listar tareas |
| POST    | `/api/tasks`              | Crear nueva tarea |
| PATCH   | `/api/tasks/:id`          | Editar título o estado |
| DELETE  | `/api/tasks/:id`          | Eliminar una tarea |
| DELETE  | `/api/tasks?done=true`    | Eliminar todas las tareas hechas |

---

## 💡 Autor

👨‍💻 **Federico Chiesa**  
📘 Proyecto académico Full Stack — ORT  
🔗 [github.com/fedechiesa](https://github.com/fedechiesa)

---

## 🍺 Estado actual

✨ **Proyecto finalizado**  
🎨 Incluye diseño moderno y componentes reutilizables  
🔥 Backend funcional con persistencia JSON  
🍻 ¡Listo para seguir ampliando!  
