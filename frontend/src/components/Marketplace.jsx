import React, { useEffect, useState } from 'react';
import { fetchItems, addItem } from '../api';
import axios from 'axios';

export default function Marketplace() 
{
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  const handleChange = (e) => {
    setNewItem(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitNewItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.description || !newItem.price) return;

    await addItem(newItem);
    setNewItem({name: '', category: '', description: '', price: '' });
    loadItems();
  };

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/items/${id}`);
      loadItems(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="marketplace">
      <h2>Marketplace</h2>

      <ul className="item-list">
        {items.map(({ id, name, category, description, price}) => (
          <li key={id} className="item-card">
            <h3>{name}</h3>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Description (Optional): </strong> <br></br> {description}</p>
            <p><strong>Price:</strong> ${price}</p>
            <button className="btn btn-danger" onClick={() => handleDelete(id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="add-item-form">
        <h3>Sell an Item</h3>
        <form onSubmit={submitNewItem}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newItem.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description (optional)"
            size="100"
            value={newItem.description}
            onChange = {handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            min="0"
            value={newItem.price}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Add Item</button>
        </form>
      </div>
    </div>
  );
}
