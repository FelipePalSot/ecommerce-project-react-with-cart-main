// Configuración de la API
const API_CONFIG = {
  // URL base del backend
  BASE_URL: import.meta.env.VITE_API_URL || 'https://felipepalomino.lat/api/v1',
  
  // Endpoints
  ENDPOINTS: {
    CATALOGO: '/catalogo',
    SEGURIDAD: '/seguridad',
  },
  
  // Timeout para peticiones (ms)
  TIMEOUT: 10000,
};

export default API_CONFIG;
