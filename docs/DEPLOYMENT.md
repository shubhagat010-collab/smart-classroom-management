# Deployment Guide

## Docker Deployment

### Build Images

```bash
docker-compose build
```

### Run Containers

```bash
docker-compose up -d
```

### View Logs

```bash
docker-compose logs -f
```

### Stop Services

```bash
docker-compose down
```

## Cloud Deployment (AWS)

### Using AWS ECS

1. Create ECR repositories for backend and frontend
2. Push Docker images to ECR
3. Create ECS tasks and services
4. Configure load balancer
5. Set up RDS for MongoDB
6. Set up ElastiCache for Redis

### Environment Variables (AWS)

```
MONGODB_URI=mongodb://<atlas-cluster>
REDIS_URI=redis://<elasticache-endpoint>
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
OPENAI_API_KEY=<your-key>
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy SCMS

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push
        run: |
          docker build -t scms-backend ./backend
          docker build -t scms-frontend ./frontend
```

## Monitoring

- Use CloudWatch for AWS monitoring
- Set up application performance monitoring (APM)
- Configure log aggregation
- Set up alerts for critical errors

## Backup Strategy

- Daily MongoDB backups
- Redis persistence enabled
- Database replication
- Cross-region backup
