// 🎨 Configuración de Colores MaqOn
// Paleta oficial basada en las imágenes generadas

export const colors = {
  // 🟡 Amarillo MaqOn - Color principal de marca
  primary: {
    50: '#fef7e6',
    100: '#fdecc3',
    200: '#fbd99b',
    300: '#f9c673',
    400: '#f7b34b',
    500: '#f7b34b', // Amarillo MaqOn principal uniforme
    600: '#e6a02e',
    700: '#d38e29',
    800: '#c07c24',
    900: '#ad6a1f',
  },

  // ⚫ Grises técnicos - Para fondos y texto
  secondary: {
    50: '#f5f5f5',
    100: '#e6e6e6',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
      800: '#2E2E2E', // Gris técnico principal
  900: '#030303', // Negro profundo personalizado
  },

  // 🟠 Acentos - Para elementos destacados
  accent: {
    50: '#fff7e6',
    100: '#ffedcc',
    200: '#ffe3b3',
    300: '#ffd999',
    400: '#ffcf80',
    500: '#ffc566',
    600: '#ffbb4d',
    700: '#ffb133',
    800: '#ffa71a',
    900: '#ff9d00',
  },

  // 🟢 Estados de éxito
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // 🟡 Estados de advertencia
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // 🔴 Estados de error
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

// 🎯 Uso recomendado de colores
export const colorUsage = {
  // Texto principal
  textPrimary: '#030303',                  // Negro profundo personalizado
  textSecondary: colors.secondary[700],    // Gris oscuro
  textMuted: colors.secondary[500],        // Gris medio
  
  // Fondos
  backgroundPrimary: '#FFFFFF',            // Blanco puro
  backgroundSecondary: colors.secondary[50], // Gris muy claro
  backgroundDark: colors.secondary[800],   // Gris técnico
  
  // Elementos de marca
  brandPrimary: colors.primary[500],       // Amarillo MaqOn
  brandSecondary: colors.secondary[800],   // Gris técnico
  
  // Estados
  success: colors.success[500],            // Verde
  warning: colors.warning[500],            // Amarillo
  error: colors.error[500],                // Rojo
  
  // Bordes
  borderLight: colors.secondary[200],      // Gris claro
  borderMedium: colors.secondary[300],     // Gris medio
  borderDark: colors.secondary[400],       // Gris oscuro
};

// 🌈 Gradientes predefinidos
export const gradients = {
  primary: 'linear-gradient(135deg, #f7b34b 0%, #e6a02e 100%)',
  secondary: 'linear-gradient(135deg, #2E2E2E 0%, #030303 100%)',
  accent: 'linear-gradient(135deg, #f7b34b 0%, #ffc566 100%)',
  background: 'linear-gradient(135deg, #f5f5f5 0%, #e6e6e6 100%)',
  card: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
};

export default colors;
