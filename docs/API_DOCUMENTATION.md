# Smart Classroom Management Software - Documentation

## Setup Instructions

### Prerequisites
- Node.js v16+
- Docker & Docker Compose
- MongoDB
- Redis
- Git

### Installation

#### Option 1: Using Docker Compose (Recommended)

```bash
cd smart-classroom-management
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Redis on port 6379
- Backend API on port 5000
- Frontend on port 3000

#### Option 2: Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm start
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## API Documentation

### Authentication

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "student"
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Attendance

**GET /api/attendance/records**
Get all attendance records

**POST /api/attendance/check-in**
```json
{
  "studentId": "S001",
  "classroomId": "C001",
  "method": "mobile"
}
```

**GET /api/attendance/reports**
Generate attendance reports

### Resources

**GET /api/resources**
List all resources

**POST /api/resources**
```json
{
  "name": "Projector 1",
  "type": "projector",
  "location": "Room 101"
}
```

### Alerts

**GET /api/alerts**
Get all alerts

**POST /api/alerts/emergency**
```json
{
  "type": "fire",
  "message": "Fire detected",
  "location": "Room 101",
  "severity": "critical"
}
```

### Analytics

**GET /api/analytics/attendance**
Attendance analytics

**GET /api/analytics/engagement**
Student engagement data

**GET /api/analytics/resources**
Resource utilization

### Chatbot

**POST /api/chatbot/message**
```json
{
  "message": "How do I solve quadratic equations?",
  "studentId": "S001"
}
```

**GET /api/chatbot/learning-gaps/:studentId**
Identified learning gaps

## Technology Stack

### Backend
- Node.js & Express.js
- MongoDB
- Redis
- Socket.io
- JWT Authentication
- Helmet for security

### Frontend
- React.js
- Redux
- Material-UI
- Axios
- Socket.io Client
- Chart.js & Recharts

## Features

1. **Attendance Automation**
   - Automated check-in system
   - Real-time attendance reports
   - Historical analytics

2. **Resource Management**
   - Track classroom resources
   - Maintenance scheduling
   - Utilization analytics

3. **Safety & Security**
   - Emergency alerts
   - Real-time notifications
   - Incident logging

4. **Analytics**
   - Student engagement metrics
   - Attendance trends
   - Performance analytics

5. **AI Chatbot**
   - Learning gap identification
   - Personalized recommendations
   - 24/7 student support

## Project Structure

```
smart-classroom-management/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   └── App.js
│   ├── public/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please create a GitHub issue or contact support@scms.edu
