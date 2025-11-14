# Frontend - Integración con API de Catálogo

## Cambios Realizados

### 1. Eliminación de datos estáticos
- **Archivo**: `src/pages/lista-productos/ListaProductos.jsx`
- Se eliminó el array `PRODUCTS` que contenía datos hardcodeados
- Ahora los productos se obtienen dinámicamente desde la API

### 2. Nueva configuración de API
- **Archivo**: `src/config/api.js`
- Configuración centralizada para URLs del backend
- Permite cambiar entre entornos fácilmente (desarrollo/producción)

### 3. Implementación de fetch con React Hooks
- `useState` para manejar: products, loading, error, category
- `useEffect` para cargar productos al montar el componente
- `useMemo` para transformar y filtrar productos eficientemente

### 4. Mapeo de datos backend → frontend
La API devuelve productos con estructura diferente:
```javascript
// Backend
{
  id: 1,
  nombre: "Producto",
  precio: 10.5,
  imagen: "archivo.jpg",
  categoria: { nombre: "Categoría" }
}

// Frontend (transformado)
{
  id: 1,
  title: "Producto",
  price: 10.5,
  img: "/assets/products/archivo.jpg",
  category: "categoria-mapeada"
}
```

### 5. Estados de carga
- **Loading**: Muestra "Cargando productos..."
- **Error**: Muestra mensaje de error con botón para reintentar
- **Sin resultados**: Muestra "No se encontraron productos..."

### 6. Mapeo de categorías
```javascript
'Detergentes' → 'lavanderia'
'Lavavajillas' → 'cocina'
'Desinfectantes' → 'baño'
'Multiusos' → 'multiusos'
'Suavizantes' → 'lavanderia'
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
VITE_API_URL=https://felipepalomino.lat/api/v1
```

Para desarrollo local:
```bash
VITE_API_URL=http://localhost:3000/api/v1
```

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
```

## Endpoint Consumido

**URL**: `https://felipepalomino.lat/api/v1/catalogo`  
**Método**: `GET`  
**Respuesta**: Array de productos con información de categoría

## Funcionalidades

1. ✅ Carga dinámica de productos desde API
2. ✅ Filtrado por categoría
3. ✅ Estados de carga y error
4. ✅ Transformación de datos backend a formato frontend
5. ✅ Manejo de errores con opción de reintentar
6. ✅ Compatible con el componente ProductCard existente

## Próximos Pasos Recomendados

1. **Caché de datos**: Implementar cache con React Query o SWR
2. **Paginación**: Si el catálogo crece, implementar paginación
3. **Búsqueda**: Agregar búsqueda por nombre de producto
4. **Filtros avanzados**: Rango de precios, ordenamiento
5. **Detalle de producto**: Endpoint individual `/catalogo/:id`
6. **Imágenes**: Configurar CDN o servicio de imágenes del backend

## Troubleshooting

### CORS Error
Si ves errores de CORS, verifica que el backend tenga configurado:
```javascript
app.use(cors({
  origin: 'https://tu-dominio-frontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

### Imágenes no cargan
Las imágenes deben estar en: `public/assets/products/[nombre-imagen.jpg]`
El backend devuelve solo el nombre del archivo, el frontend agrega la ruta completa.

### Categorías no filtran
Verifica que el mapeo de categorías en `mapCategoria()` coincida con los nombres que devuelve el backend.
