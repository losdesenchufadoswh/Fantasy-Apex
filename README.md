# 🎮 APEX ARENA — Ghost Duel

Gamificación de ventas y vida para el equipo de **Windmar Home**.
**Concepto:** compites contra **tu propio fantasma** — el "tú" de antes. Cada día contra el yo de ayer, y cada semana contra el yo de la semana pasada. Si te superas, ganas. 👻

---

## 🚀 Deploy en Vercel

**Opción A — Drag & Drop (más fácil)**
1. Entra a https://vercel.com/windmarhome
2. **Add New… → Project** (o arrastra esta carpeta al dashboard)
3. Sube **todos** los archivos de esta carpeta
4. **Deploy** → te da un link para compartir con el equipo

**Opción B — Vercel CLI**
```bash
npm i -g vercel
cd apex-arena-vercel
vercel --prod
```

> ⚠️ **Si ya tenías la app vieja en el iPhone y daba error** ("Response served by service worker has redirections"):
> esta versión lo arregla. Después de subir a Vercel: **borra el ícono viejo del home**, abre el link en **Safari** una vez (para que actualice), y vuelve a **Agregar a inicio**.

---

## 📲 Instalar en el celular (PWA)
- **iPhone (Safari):** abre el link → botón **Compartir** → **"Agregar a inicio"**
- **Android (Chrome):** abre el link → botón **"📲 Instalar App"** en la pestaña Config (o menú ⋮ → Instalar app)
- Funciona **offline**; sincroniza con Firebase cuando vuelve la conexión.

---

## 🕹️ Cómo se juega

### Puntos (scoring)
**Ventas**
| Acción | Puntos |
|---|---|
| 📞 Llamada | 0.1 c/u |
| 🚪 Puerta | 0.1 c/u |
| 💬 Diálogo | 0.1 c/u |
| 🧭 Orientación | 0.5 c/u |
| 📍 Visita | 1 c/u |
| 🎯 Oportunidad | 1.5 c/u |
| 📄 Cotización | 2 c/u |
| 💰 Venta | 10 c/u |
| ✅ Daily completado | 5 |

**Bienestar / Vida** 🌱
| Acción | Puntos |
|---|---|
| 🏃 Correr 1 milla+ | 2 c/u |
| 🏋️ Workout | 1 c/u |
| 👟 10k pasos | 1 |
| 😴 Dormir 7h+ | 0.5 |
| 📖 Leer 10 páginas | 0.5 |
| 🎓 Curso/Tutorial 30 min | 1 |

### El duelo (Arena)
- Tu score de la **semana** vs tu **fantasma**.
- **Semana 1:** rival base configurable (default "Krampus Ataca", 19.8 pts).
- **Semana 2+:** el rival son tus propios stats de la semana anterior.
- **🏁 Cerrar Semana:** calcula W/L, avanza de semana y congela tus stats como el próximo fantasma.

### 👻 Duelos diarios — Tú vs el Yo de Ayer
- Cada día con datos se compara con el último día que registraste.
- Si **ayer te gana**, cuenta como derrota (▼) y aparece en la pestaña **Liga**.
- Ahí ves el récord diario (Ganados / Perdidos) y la tabla de los últimos duelos.

### 🎖️ Logros
50 logros que se desbloquean solos (ventas, bienestar, rachas, niveles…). Brillan en oro al desbloquearse, con confetti y sonido.

### 📈 XP y Niveles
Cada punto = 10 XP. Subes de nivel con curva progresiva.

---

## 👥 Multijugador (el equipo)

**Dónde:** toca el **chip del jugador** (arriba a la derecha) o **👥 Gestionar Jugadores** (pestaña Equipo / Config).

- **Agregar jugador:** elige un emoji + escribe el nombre → **Agregar**.
- **Borrar jugador:** botón 🗑️ en cada jugador (pide confirmación, borra su temporada).
- **Cambiar de jugador:** toca cualquier jugador de la lista.
- **📷 Foto:** botón 📷 en cada jugador → sube una foto desde el celular (se reduce automáticamente para que no pese).
- Cada miembro tiene **su propia temporada y su propio fantasma**, independientes.

**🏆 Pestaña Equipo (Leaderboard):** ranking en vivo del equipo por victorias → puntos → nivel, con medallas 🥇🥈🥉. Se sincroniza por Firebase entre todos los celulares.

---

## 🔐 Login (opcional, se activa desde Config)

En **Config → 🔐 Login del Equipo**:
1. Activa el switch **"Requerir login (PIN)"**.
2. Selecciona tu jugador y ponle un **PIN** (4-6 dígitos) en "PIN del jugador activo" → **Guardar PIN**. (Vacío = sin PIN.)
3. Repite para cada miembro que quiera PIN.

**Cómo funciona:** al abrir la app aparece una **pantalla de selección**; cada quien toca su jugador y, si tiene PIN, lo escribe. La sesión queda guardada en ese celular hasta que toques **🚪 Cerrar sesión**.

> Es un **bloqueo simple** para que cada quien use su perfil — no es seguridad bancaria. No metas contraseñas reales ahí.

---

## 🎲 Retos Personalizados

En **Config → 🎲 Retos Personalizados** puedes crear los tuyos:
- Nombre (ej: *"Tirarse en paracaídas"*), emoji (🪂) y puntos (3) → **Agregar Reto**.
- Aparecen automáticamente en el registro diario de **todos** (son compartidos por el equipo).
- Bórralos con 🗑️ cuando quieras.

---

## 📊 Exportar
En **Config → 📲 App & Datos**:
- **📊 Exportar CSV** — toda la temporada del jugador (ventas, bienestar y retos custom).
- **🖨️ Exportar/Imprimir PDF** — reporte con récord semanal, duelos diarios y tabla de 12 semanas (usa "Guardar como PDF" en el diálogo de impresión).

---

## 📦 Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` | Configuración PWA |
| `sw.js` | Service worker (offline) — **corrige el bug de iOS** |
| `icon-192.png` / `icon-512.png` | Íconos de la app |
| `vercel.json` | Headers de hosting |

## 🔥 Firebase
Proyecto `fantasy-df635` (Realtime Database). Datos bajo la ruta `apexArenaV2`:
- `apexArenaV2/roster` — el equipo
- `apexArenaV2/players/{id}` — temporada de cada jugador
- `apexArenaV2/customCategories` — retos personalizados
- `apexArenaV2/loginEnabled` — si el login está activo

Si Firebase falla, la app usa `localStorage` automáticamente y sincroniza al reconectar.

---
Windmar Home · Puerto Rico 🇵🇷
