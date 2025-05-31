const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5001;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());


let users = JSON.parse(fs.readFileSync('./users.json'));

// Simple login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, username });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

// Items data - in-memory store for demo
let items = [
  { id: 1, name: 'T-Shirt', category: 'Clothing', description: "Comfortable and stylish T-shirt for just $20, perfect for everyday wear.", price: 20},
  { id: 2, name: 'Laptop', category: 'Electronics', description:"High-performance laptop in excellent condition for just $1000, perfect for work, school, or everyday use.", price: 1000},
  { id: 3, name: 'Book', category: 'Books', description: "Explore a wide range of captivating books in great condition for only $15, each perfect for readers of all kinds.", price: 15},
  { id: 4, name: 'Guitar', category: 'Musical Instruments', description: "Quality guitar in great condition for just $150, ideal for beginners and seasoned players alike.", price: 150},
];

// Get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Add item (for selling)
app.post('/api/items', (req, res) => {
  const { name, category, description, price} = req.body;
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const newItem = {id, name, category, description, price: Number(price)};
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Delete an item (in-memory version)
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === itemId);

  if (index !== -1) {
    items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted successfully' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});


