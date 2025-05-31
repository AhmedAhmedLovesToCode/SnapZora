import React from 'react';

function ItemCard({ item, onDelete }) {
  return (
    <div className="item-card">
      <h2>{item.name}</h2>
      <p><strong>Category: </strong> {item.category}</p>
      <p><strong>Description (Optional): </strong> <br></br> {item.description}</p>
      <p><strong>Price: </strong> ${item.price}</p>
      <button onClick={() => onDelete(item.id)}>Remove</button>
    </div>
  );
}

export default ItemCard;
