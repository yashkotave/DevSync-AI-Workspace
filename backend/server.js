const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'DevSync Workspace API is online', data: null });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found', data: null });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[DevSync API] listening on port ${PORT}`);
});
