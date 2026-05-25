# SCMS Development Guide

## Setting Up Development Environment

### Prerequisites

```bash
node --version  # v16+
npm --version   # 8+
```

### Backend Development

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Run development server with auto-reload
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start development server
npm start
```

## Code Structure

### Backend Structure

```
backend/
├── routes/          # API route handlers
├── models/          # Database models
├── controllers/     # Business logic
├── middleware/      # Express middleware
├── utils/           # Utility functions
├── services/        # External service integrations
└── server.js        # Server entry point
```

### Frontend Structure

```
frontend/src/
├── pages/           # Page components
├── components/      # Reusable components
├── store/           # Redux store
├── services/        # API services
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── App.js           # Main app component
```

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Write/update tests
4. Commit with meaningful messages
5. Create a pull request
6. Request code review
7. Merge after approval

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Code Standards

- Use ESLint for code quality
- Follow Airbnb JavaScript style guide
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

## Debugging

### Backend Debugging

```bash
node --inspect server.js
# Then open chrome://inspect in Chrome
```

### Frontend Debugging

Use React Developer Tools browser extension

## Performance Tips

- Use memoization for expensive computations
- Optimize database queries
- Implement caching strategies
- Lazy load components
- Monitor bundle size

## Common Issues

### Port Already in Use

```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Issues

Check connection string in .env file

### CORS Errors

Ensure FRONTEND_URL is correctly set in backend .env
