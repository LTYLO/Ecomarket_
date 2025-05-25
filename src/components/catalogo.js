import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const search = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    const url = search
      ? `http://localhost:8000/api/products/?search=${search}`
      : 'http://localhost:8000/api/products/';

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, [search]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img src={`http://localhost:8000${product.image}`} alt={product.title} className="h-40 w-full object-cover mb-2" />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p>{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
