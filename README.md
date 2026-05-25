# Smart Classroom Management Software (SCMS)

## Overview

The Smart Classroom Management Software (SCMS) is a comprehensive, cloud-based solution designed to streamline classroom operations, improve resource utilization, and enhance the overall learning experience. This fullstack application combines advanced algorithms, data analytics, and cloud-based technologies to automate various aspects of classroom management.

## Key Features

### 1. Attendance Automation
- Facial recognition algorithms for automated student identification
- Mobile app-based check-ins
- Real-time attendance reports accessible by teachers and administrators
- Historical attendance analytics

### 2. Resource Management
- Centralized tracking of classroom resources (projectors, computers, teaching aids)
- Automated scheduling and maintenance alerts
- Resource utilization analytics
- Downtime minimization through predictive maintenance

### 3. Safety and Security Alerts
- Real-time emergency alerts (fire, unauthorized access, security concerns)
- Integration with existing security systems
- Instant notifications to authorities and stakeholders
- Incident logging and reporting

### 4. Interactive Learning Tools
- Integration with smart boards and interactive displays
- Adaptive learning content delivery
- Real-time student engagement analytics
- Performance feedback and tracking

### 5. Data Analytics & AI-Based Chatbot
- Comprehensive classroom activity analytics
- Student behavior and attendance pattern analysis
- Predictive reports for decision-making
- AI-powered chatbot for learning gap identification
- Personalized learning recommendations

## Project Structure

```
SCMS/
├── backend/                    # Node.js/Express REST API
├── frontend/                   # React.js web application
├── mobile/                     # React Native mobile app
├── docs/                       # Documentation
├── docker-compose.yml          # Container orchestration
└── README.md
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (NoSQL)
- **Cache**: Redis
- **Authentication**: JWT
- **Real-time**: Socket.io
- **AI/ML**: TensorFlow.js, OpenAI API
- **Cloud**: AWS/Google Cloud

### Frontend
- **Framework**: React.js
- **State Management**: Redux
- **UI Library**: Material-UI
- **Real-time**: Socket.io client
- **Charts**: Chart.js, Recharts
- **Authentication**: JWT

### Mobile
- **Framework**: React Native
- **State Management**: Redux
- **Camera/Recognition**: react-native-camera, TensorFlow Lite
- **Real-time**: Socket.io

## Installation & Setup

### Prerequisites
- Node.js v16+
- Docker & Docker Compose
- MongoDB
- Redis
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/shubhagat010-collab/smart-classroom-management.git
cd smart-classroom-management

# Using Docker Compose (Recommended)
docker-compose up -d

# Or manual setup
cd backend && npm install
cd ../frontend && npm install

# Start services
cd backend && npm start
cd ../frontend && npm start
```

## Environment Configuration

Create `.env` files in respective directories with required credentials:

### Backend `.env`
```
MONGODB_URI=mongodb://localhost:27017/scms
REDIS_URI=redis://localhost:6379
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
AWS_ACCESS_KEY=your_aws_key
OPENAI_API_KEY=your_openai_key
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### Attendance
- `GET /api/attendance/records` - Get attendance records
- `POST /api/attendance/check-in` - Record attendance
- `GET /api/attendance/reports` - Generate attendance reports

### Resources
- `GET /api/resources` - List all resources
- `POST /api/resources` - Add new resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Safety Alerts
- `POST /api/alerts/emergency` - Create emergency alert
- `GET /api/alerts` - Get alert history
- `PUT /api/alerts/:id/acknowledge` - Acknowledge alert

### Analytics
- `GET /api/analytics/attendance` - Attendance analytics
- `GET /api/analytics/engagement` - Student engagement data
- `GET /api/analytics/resources` - Resource utilization

### Chatbot
- `POST /api/chatbot/message` - Send message to AI chatbot
- `GET /api/chatbot/learning-gaps` - Get identified learning gaps

## Database Schema

Main collections in MongoDB:
- `users` - User accounts and profiles
- `attendance` - Attendance records
- `resources` - Classroom resources
- `alerts` - Safety and security alerts
- `analytics` - Analytics data
- `chatbot_interactions` - Chatbot conversation history

## Features in Development

- [ ] Facial recognition integration
- [ ] Advanced ML-based behavior prediction
- [ ] Mobile app refinement
- [ ] IoT device integration
- [ ] Video analytics
- [ ] Advanced reporting dashboard

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support & Contact

For support, email: support@scms.edu or create an issue on GitHub.

## Acknowledgments

- Educational technology community
- Open-source contributors
- Data analytics and AI/ML researchers
