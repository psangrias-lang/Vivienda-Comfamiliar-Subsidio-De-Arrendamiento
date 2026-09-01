# Vivienda Comfamiliar Risaralda 🏢✨
> **Plataforma Web Oficial para el Subsidio de Arrendamiento Temporal, Fondo FOVIS y Portal de Empresas Aportantes (Caracterización Post-Sismo).**

---

## 🌟 Descripción del Proyecto

Aplicación web moderna, responsiva y accesible desarrollada para **Vivienda Comfamiliar Risaralda**, diseñada con la identidad visual institucional (Azul Marino `#002447` / `#003B70`, Dorado `#D4AF37` / `#F5D061` y Blanco) y estructurada bajo los lineamientos oficiales:

1. **Subsidio de Arrendamiento Temporal (Manual de Operación Gerencial):**
   - Requisitos de afiliación para Dependientes ($\ge 2$ meses), Pensionados 2% ($\ge 12$ meses) e Independientes 2% ($\ge 12$ meses).
   - Ingresos del grupo familiar: **Igual o menor a 2 SMMLV** (Hasta $3.501.810 COP).
   - Monto: Hasta **0.6 SMMLV mensual** ($1.050.543 COP/mes, máx. 90% del canon pactado) por **6 meses continuos transitorios** (hasta $6.303.258 COP).
   - Canon máximo permitido: 1% del tope VIS de 135 SMMLV ($2.363.722 COP).
   - Simulador interactivo de canon y subsidio.
2. **Portal de Empresas Aportantes (Guía Oficial):**
   - Acceso sin contraseñas mediante código OTP de 6 dígitos enviado por correo corporativo.
   - Generador de enlace personalizado con token único y conexión directa al Formulario Oficial en Google Apps Script.
   - Mensaje modelo de WhatsApp y generador de Código QR para carteleras.
   - Panel de Gestión Humana con pestañas de *Resumen* (KPIs) y *Respuestas* con estricto régimen de *Habeas Data*.
3. **Portafolio Integral FOVIS:**
   - Modalidades: Vivienda Nueva VIS/VIP, Mejoramiento de Vivienda y Construcción en Sitio Propio.
   - Descarga de fichas normativas y módulo interactivo de requisitos y preguntas frecuentes.

---

## 🛠️ Stack Tecnológico

- **Framework:** React 19 + TypeScript + Vite 8
- **Estilos:** Tailwind CSS con paleta institucional Comfamiliar Blue & Gold
- **Iconografía:** Lucide React
- **Animaciones y Efectos:** Canvas Confetti & Tailwind Transitions

---

## 🚀 Instalación y Puesta en Marcha Local

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn / pnpm

### Pasos
```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
cd TU_REPOSITORIO

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`.

---

## 📦 Compilación para Producción (Build)

Para generar la carpeta de producción estática optimizada (`dist/` con `index.html`, `assets/` JS/CSS y recursos gráficos):

```bash
npm run build
```

Para previsualizar localmente la versión de producción:
```bash
npm run preview
```

---

## 📂 Estructura del Proyecto

```text
vivienda-comfamiliar/
├── index.html              # Entrada HTML principal en la raíz
├── package.json            # Scripts y dependencias del proyecto
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
├── public/                 # Recursos estáticos (Logos oficiales PNG)
│   ├── logo-exacto.png
│   └── logo-exacto-light.png
└── src/
    ├── main.tsx            # Punto de entrada de React
    ├── App.tsx             # Enrutador y orquestador principal
    ├── index.css           # Estilos globales de Tailwind
    ├── types/              # Definiciones de TypeScript (censo, modalidades)
    ├── data/               # Datos auditados normativos (subsidios, municipios)
    └── components/         # Componentes modulares
        ├── ComfamiliarLogo.tsx
        ├── Header.tsx
        ├── HeroSection.tsx
        ├── SubsidioArrendamientoSection.tsx
        ├── SimuladorSubsidio.tsx
        ├── ModalidadesGrid.tsx
        ├── RequisitosAccordion.tsx
        ├── PortalEmpresas.tsx
        ├── AdminDashboard.tsx
        ├── ConsultaRadicadoModal.tsx
        ├── Footer.tsx
        └── CensoForm/
            ├── MultiStepCenso.tsx
            ├── Paso1Identificacion.tsx
            ├── Paso2Localizacion.tsx
            ├── Paso3Afectacion.tsx
            ├── Paso4Consentimiento.tsx
            └── ModalExitoRadicado.tsx
```

---

## 📄 Licencia y Derechos
© Comfamiliar Risaralda - Todos los derechos reservados.
