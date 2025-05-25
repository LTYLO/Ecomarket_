import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const dispatch = useDispatch();

  useEffect(() => {
    const url = search
      ? `http://localhost:8000/api/products/?search=${search}`
      : 'http://localhost:8000/api/products/';

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al obtener productos:', err));
  }, [search]);

  const handleAddToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        title: product.title,
        price: Number(product.price),  
      },
    });
  };

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
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              >
                Agregar al carrito
              </button>
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
