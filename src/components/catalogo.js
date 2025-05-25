import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-lg shadow">
        <img src={`http://localhost:8000${product.image}`} alt={product.title} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="font-bold">${product.price}</p>
        </div>
      ))}
    
    </div>
  );
};


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProductList);