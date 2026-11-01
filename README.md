# 🏥 MediConnect — Consultorio Médico Inteligente con IA

> **Solución para el Hackatón Donweb 2026: Desafío Cloud & IaaS**  
> **Problema:** Negocios locales y consultorios médicos que pierden pacientes y ventas por atender consultas y turnos manualmente por WhatsApp o teléfono.  
> **Solución:** Plataforma médica digital integral con 12 especialidades, 24 médicos y un asistente de Inteligencia Artificial (MediBot) que atiende 24/7, realiza triage sintomático y agenda turnos de forma automatizada.

---

## 🌐 URLs y Accesos de Producción

- **URL Pública Inmediata (IP Directa):** [http://201.32.132.163](http://201.32.132.163)
- **Dominio Asociado:** [http://dwday-125157604.online](http://dwday-125157604.online) *(requiere registro A apuntando a `201.32.132.163`)*
- **Repositorio de Código:** [https://github.com/ebolivar1000/hackaton-donweb-2026](https://github.com/ebolivar1000/hackaton-donweb-2026)

---

## 🩺 Características Principales

### 1. 12 Especialidades Médicas Integradas
1. **Cardiología** (Hipertensión, arritmias, prevención cardiovascular)
2. **Dermatología** (Acné, control de lunares, patología cutánea)
3. **Pediatría** (Atención integral de recién nacidos a adolescentes)
4. **Traumatología y Ortopedia** (Lesiones deportivas, columna, articulaciones)
5. **Ginecología y Obstetricia** (Salud reproductiva, controles de rutina)
6. **Neurología** (Cefaleas, migrañas, trastornos del sueño)
7. **Oftalmología** (Agudeza visual, fondo de ojo, catarata y glaucoma)
8. **Gastroenterología** (Reflujo, colon irritable, salud digestiva)
9. **Urología** (Tracto urinario, chequeos preventivos de próstata)
10. **Otorrinolaringología** (Oído, nariz, laringe, audición y ronquidos)
11. **Psiquiatría y Salud Mental** (Ansiedad, depresión, estrés agudo)
12. **Endocrinología** (Tiroides, diabetes, metabolismo)

### 2. 24 Doctores Matriculados
- Cada especialidad cuenta con 2 especialistas.
- Perfiles con matrícula oficial (MN), arancel de consulta, horarios matutinos/vespertinos, días de atención semanales y calificaciones de pacientes.

### 3. MediBot: Inteligencia Artificial en Tiempo Real
- **Ubicación:** Widget flotante en la esquina inferior derecha.
- **Triage Clínico:** Escucha los síntomas del paciente en lenguaje natural y deduce qué especialista necesita.
- **Detección de Urgencias:** Ante síntomas de alarma vital (dolor agudo de pecho, ACV, pérdida de conciencia), advierte inmediatamente la necesidad de llamar al 107 o acudir a la Guardia 24hs.
- **Integración Dual:** Cuenta con un motor de inferencia clínico incorporado (funciona sin API key externa) y soporte nativo para **Google Gemini 1.5 Flash** al configurar `GEMINI_API_KEY`.

### 4. Sistema de Turnos Online
- Flujo interactivo en 4 pasos: Especialidad ➔ Doctor ➔ Día y Horario ➔ Datos del Paciente.
- Generación de comprobante con código único de turno (`MED-XXXXXX`).
- Sincronización con base de datos **PostgreSQL**.

---

## 🏗️ Arquitectura y Tecnologías

```
[ Usuario Web ]
       │
       ▼ (Puerto 80 / 443)
┌───────────────────────┐
│     Nginx (Ubuntu)    │ ➔ Proxy inverso hacia 127.0.0.1:3000
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│     Next.js 16        │ ➔ App Router + SSR + Tailwind CSS
│  (Daemonizado con PM2)│
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   PostgreSQL 18.6     │ ➔ Base de datos 'mediconnect' (usuario admindb)
└───────────────────────┘
```

- **Frontend / Backend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS.
- **Iconografía:** Lucide React.
- **Base de Datos:** PostgreSQL 18.6 nativo en el servidor Donweb con cliente `pg`.
- **Servidor Web:** Nginx 1.18.0 configurado con proxy_pass, soporte de WebSocket y compresión.
- **Gestión de Procesos:** PM2 v7.1.1 configurado con persistencia al reinicio (`pm2 startup` y `pm2 save`).

---

## 🚀 Despliegue en el Servidor (Donweb Cloud Server)

### Conexión SSH
```bash
ssh -p5189 root@201.32.132.163
```

### Configuración del servicio en `/var/www/mediconnect`
```bash
# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save

# Ver logs de la aplicación
pm2 logs mediconnect-web

# Estado del servicio
pm2 status
```

---

## 👥 Equipo
- **Desarrollador:** Everth Bolivar ([@ebolivar1000](https://github.com/ebolivar1000))
- **Hackatón:** Donweb Cloud & IaaS 2026
