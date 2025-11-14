import "./listaProductos-styles.css";
import ProductCard from "../../components/ProductCard.jsx";
import React, { useState, useMemo, useEffect } from 'react';
import API_CONFIG from '../../config/api.js';

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CATALOGO}`;

export default function ListaProductos() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching productos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Mapear categorías del backend a las del frontend
  const mapCategoria = (categoriaBackend) => {
    const categoriaMap = {
      'Detergentes': 'lavanderia',
      'Lavavajillas': 'cocina',
      'Desinfectantes': 'baño',
      'Multiusos': 'multiusos',
      'Suavizantes': 'lavanderia'
    };
    return categoriaMap[categoriaBackend] || 'multiusos';
  };

  // Transformar productos del backend al formato del frontend
  const transformedProducts = useMemo(() => {
    return products.map(producto => ({
      id: producto.id,
      title: producto.nombre,
      price: producto.precio,
      img: `/assets/products/${producto.imagen}`,
      meta: `${producto.categoria.nombre} • Stock: ${producto.stock}`,
      category: mapCategoria(producto.categoria.nombre),
      stock: producto.stock
    }));
  }, [products]);

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    return transformedProducts.filter(product => {
      const matchesCategory = category === 'todas' || 
        product.category.toLowerCase() === category.toLowerCase();
      return matchesCategory;
    });
  }, [transformedProducts, category]);

  return (
    <main className="container">

      <section className="hero hero--clean">
        <div className="hero__content">
          <h1 className="hero__title">Artículos de limpieza confiables</h1>
          <p className="hero__subtitle">Cuidado del hogar • Desinfección • Lavandería</p>
        </div>
        <picture className="hero__media">
          <img src="/assets/imagenes/hero-limpieza.jpg" alt="Productos de limpieza organizados" />
        </picture>
      </section>

      
      <section className="filters" aria-label="Filtros del catálogo">
        <div className="filters__row">
          <div className="filters__group">
            <label htmlFor="cat">Categoría</label>
            <select 
              id="cat" 
              name="cat" 
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              >
                <option value="todas">Todas</option>
                <option value="lavanderia">Lavanderia</option>
                <option value="cocina">Cocina</option>
                <option value="baño">Baño</option>
                <option value="multiusos">Multiusos</option>
            </select>
          </div>
        </div>
      </section>

      
      <section className="grid--products" aria-label="Listado de productos">
        {loading ? (
          <div className="text-center py-8" style={{ flexBasis: '100%' }}>
            <p className="text-lg text-gray-600">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8" style={{ flexBasis: '100%' }}>
            <p className="text-lg text-red-600">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-primary mt-4"
            >
              Reintentar
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <div className="text-center py-8" style={{ flexBasis: '100%' }}>
            <p className="text-lg text-gray-600">No se encontraron productos que coincidan con su búsqueda.</p>
          </div>
        )}
      </section>
    </main>
  );
}
