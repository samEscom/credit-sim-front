# 💰 Credit Simulation Frontend

Aplicación web para simular créditos y visualizar tablas de amortización. Construida con React, TypeScript, Vite y Mantine UI.

## 📋 Descripción

Esta aplicación permite a los usuarios simular créditos ingresando el monto, tasa anual y plazo en meses. La aplicación calcula y muestra una tabla de amortización detallada con información de cada pago mensual.

## ✨ Características

### Formulario de Simulación
- **Monto del crédito**: Rango de $1,000 a $1,000,000 MXN
- **Tasa anual**: Rango de 0.1% a 100%
- **Plazo**: De 1 a 360 meses

### Tabla de Amortización
Muestra para cada mes:
- Número de mes
- Pago mensual
- Capital amortizado
- Interés pagado
- Saldo restante

### Manejo de Estado Inteligente

#### 1. Persistencia Local
Los valores del formulario (Monto, Tasa, Plazo) se guardan automáticamente en `localStorage`. Si el usuario cierra la pestaña y vuelve a abrirla, los campos recordarán los últimos valores ingresados.

#### 2. Limpieza Automática de Resultados
Cuando el usuario cambia cualquier valor del formulario (Monto, Tasa o Plazo), la tabla de resultados desaparece inmediatamente de la pantalla. Esto obliga al usuario a hacer clic nuevamente en "Calcular" para ver los datos actualizados.

### Características Adicionales
- ✅ Formateo de moneda en pesos mexicanos (MXN)
- ✅ Validación de campos del formulario
- ✅ Estados de carga durante el cálculo
- ✅ Manejo de errores con mensajes claros
- ✅ Interfaz responsiva y moderna con Mantine UI
- ✅ Diseño limpio con tablas estilizadas

## 🚀 Ejecutar en Local

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio** (si aplica):
   ```bash
   git clone <repository-url>
   cd credit-sim-front
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional):
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   cp .env.mock .env
   ```
   
   Edita el archivo `.env` y configura la URL de la API:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```
   
   > **Nota**: Si no configuras esta variable, la aplicación usará `http://127.0.0.1:8000` por defecto.

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**:
   
   La aplicación estará disponible en: `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter de código

## 🏗️ Estructura del Proyecto

```
src/
├── api/                    # Cliente de API
│   ├── creditClient.ts     # Funciones para llamar a la API de crédito
│   └── index.ts           # Exports del módulo API
├── components/            # Componentes React
│   ├── SimulationForm.tsx # Formulario principal de simulación
│   └── index.ts          # Exports de componentes
├── hooks/                # Custom React Hooks
│   └── useSimulation.ts  # Hook para manejar simulaciones
├── types/                # Definiciones de TypeScript
│   ├── credit.ts         # Tipos relacionados con crédito
│   └── index.ts         # Exports de tipos
├── App.tsx              # Componente principal
├── main.tsx            # Punto de entrada
└── index.css          # Estilos globales
```

## 🔌 API Backend

La aplicación espera que el backend esté corriendo en `http://127.0.0.1:8000` (configurable vía variable de entorno).

### Endpoint Esperado

**POST** `/credit/simulate`

**Request Body:**
```json
{
  "amount": 10000,
  "annual_rate": 12.5,
  "months": 24
}
```

**Response:**
```json
{
  "schedule": [
    {
      "month": 1,
      "payment": 471.78,
      "principal": 367.45,
      "interest": 104.33,
      "remaining_balance": 9632.55
    },
    // ... más meses
  ]
}
```

## 🛠️ Stack Tecnológico

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Mantine UI** - Componentes de interfaz
- **ESLint** - Linter de código

## 📝 Notas de Desarrollo

- La aplicación usa `erasableSyntaxOnly` en TypeScript para mayor strictness
- Los estilos de Mantine se importan en el componente principal
- El manejo de estado usa React Hooks nativos
- La persistencia usa `localStorage` del navegador


## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
