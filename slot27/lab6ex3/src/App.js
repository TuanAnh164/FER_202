import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from './cartStore';

const products = [
  { id: 1, name: 'iPhone 15', price: 1000 },
  { id: 2, name: 'MacBook Pro', price: 2000 },
  { id: 3, name: 'AirPods', price: 200 },
];

function CartApp() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ margin: '20px' }}>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} - ${item.price} x {item.quantity}
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  );
}

export default CartApp;
