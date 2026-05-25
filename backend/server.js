const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const socketIo = require('socket.io');
const http = require('http');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✓ MongoDB connected successfully');
}).catch(err => {
  console.error('✗ MongoDB connection error:', err.message);
  process.exit(1);
});

// Redis Connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URI || 'redis://localhost:6379',
  legacyMode: true
});

redisClient.connect().then(() => {
  console.log('✓ Redis connected successfully');
}).catch(err => {
  console.error('✗ Redis connection error:', err.message);
});

// Store io instance globally for use in controllers
app.set('io', io);
app.set('redisClient', redisClient);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    redis: redisClient.isOpen ? 'connected' : 'disconnected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Smart Classroom Management Software (SCMS) API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      attendance: '/api/attendance',
      resources: '/api/resources',
      alerts: '/api/alerts',
      analytics: '/api/analytics',
      chatbot: '/api/chatbot',
      users: '/api/users'
    }
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`✓ New user connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`✗ User disconnected: ${socket.id}`);
  });

  // Real-time event listeners
  socket.on('join-classroom', (classroomId) => {
    socket.join(`classroom-${classroomId}`);
    console.log(`User ${socket.id} joined classroom ${classroomId}`);
  });

  socket.on('alert', (data) => {
    io.to(`classroom-${data.classroomId}`).emit('alert', data);
  });

  socket.on('attendance-update', (data) => {
    io.to(`classroom-${data.classroomId}`).emit('attendance-update', data);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 SCMS Backend Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 WebSocket enabled for real-time updates\n`);
});

module.exports = { app, io, redisClient };
