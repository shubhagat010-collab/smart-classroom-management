# SCMS Quick Start Guide

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shubhagat010-collab/smart-classroom-management.git
cd smart-classroom-management
```

### 2. Using Docker (Recommended)

```bash
# Build and run all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

### 3. Manual Installation

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Start server
npm start

# Or for development with hot reload
npm run dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm start
```

## Configuration

### Backend Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://admin:admin123@localhost:27017/scms?authSource=admin
REDIS_URI=redis://localhost:6379

# Authentication
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# Third-party APIs
OPENAI_API_KEY=your_openai_api_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

### Frontend Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Testing the Application

### Test Login

1. Navigate to http://localhost:3000/login
2. Use any email and password (minimum 6 characters)
3. Should login successfully and redirect to dashboard

### Test API Endpoints

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Attendance Records (requires token)
curl -X GET http://localhost:5000/api/attendance/records \
  -H "Authorization: Bearer YOUR_TOKEN"

# Health Check
curl http://localhost:5000/api/health
```

## Project Structure

```
smart-classroom-management/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── services/            # Business logic
│   ├── middleware/          # Express middleware
│   ├── utils/               # Utility functions
│   ├── server.js            # Main server file
│   ├── package.json         # Dependencies
│   ├── Dockerfile           # Docker configuration
│   └── .env.example         # Example env variables
├── frontend/
│   ├── src/
│   │   ├── pages/        # React page components
│   │   ├── components/   # Reusable components
│   │   ├── store/        # Redux store
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   └── DEVELOPMENT.md
├── docker-compose.yml
├── .gitignore
├── LICENSE
└── README.md
```

## Key Features Implemented

### ✅ Attendance Module
- Record student attendance
- Generate attendance reports
- View attendance statistics
- Multiple check-in methods (mobile, facial recognition, manual)

### ✅ Resource Management
- Add and manage classroom resources
- Track resource usage and utilization
- Schedule maintenance
- Resource status monitoring

### ✅ Safety & Security
- Create emergency alerts
- Real-time alert broadcasting
- Acknowledge and resolve alerts
- Alert statistics and history

### ✅ Analytics
- Attendance analytics and trends
- Student engagement metrics
- Resource utilization reports
- Performance analytics

### ✅ AI Chatbot
- Chat with AI assistant
- Learning gap identification
- Conversation history
- Resource recommendations

### ✅ Authentication
- User registration and login
- JWT-based authentication
- Role-based access control
- Token refresh mechanism

## Common Commands

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart backend

# Remove volumes (careful!)
docker-compose down -v
```

### Backend Commands

```bash
# Start development server
cd backend && npm run dev

# Run tests
npm test

# Install new package
npm install package-name
```

### Frontend Commands

```bash
# Start development server
cd frontend && npm start

# Build for production
npm run build

# Run tests
npm test
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Error

Ensure MongoDB is running and connection string is correct in .env

```bash
# Test MongoDB connection
mongo "mongodb://admin:admin123@localhost:27017/scms?authSource=admin"
```

### Frontend Can't Connect to Backend

Check that:
1. Backend is running on port 5000
2. REACT_APP_API_URL is correctly set
3. CORS is enabled in backend
4. No firewall blocking the connection

## Next Steps

1. Complete implementation of all modules
2. Add unit and integration tests
3. Set up CI/CD pipeline
4. Deploy to cloud (AWS/GCP/Azure)
5. Monitor performance and usage
6. Implement advanced analytics

## Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Contact: support@scms.edu
- Documentation: See /docs folder

## License

MIT License - See LICENSE file
