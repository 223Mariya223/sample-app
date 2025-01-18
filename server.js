const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data Store
let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

let tasks = ['Learn Cypress', 'Write Tests'];

// File Upload Configuration
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// User Routes
app.get('/api/users', (req, res) => {
  res.json({ users });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const id = users.length + 1;
  users.push({ id, name, email });
  res.status(201).json({ id, name, email });
});

// Task Routes
app.get('/api/tasks', (req, res) => {
  res.json({ tasks });
});

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.status(201).json({ task });
  } else {
    res.status(400).json({ error: 'Task cannot be empty' });
  }
});

// File Upload Route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'File uploaded successfully' });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
