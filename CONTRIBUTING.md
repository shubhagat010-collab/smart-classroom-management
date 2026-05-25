# Contributing to SCMS

## Code of Conduct

Be respectful and professional in all interactions.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m 'Add your feature'`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## Development Setup

Follow the Quick Start guide to set up your development environment.

## Coding Standards

### JavaScript/Node.js
- Use ES6+ syntax
- Follow Airbnb style guide
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### React
- Use functional components with hooks
- Keep components reusable
- Use proper prop validation
- Implement error boundaries

### Database
- Use mongoose for MongoDB
- Define clear schemas
- Add indexes for frequently queried fields
- Use transactions for complex operations

## Testing

- Write tests for new features
- Aim for 80%+ code coverage
- Test both happy path and error cases
- Use meaningful test descriptions

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Commit Messages

Follow conventional commits:

```
type(scope): subject

body

footer
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat(attendance): add facial recognition support

Implement facial recognition for automated attendance tracking.
Uses OpenCV and TensorFlow.js for face detection.

Closes #123
```

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Get at least 2 approvals before merging

## Issue Templates

### Bug Report
```
**Describe the bug**
Clear description of what the bug is.

**Steps to reproduce**
1. Go to...
2. Click on...
3. See error

**Expected behavior**
What should happen

**Actual behavior**
What actually happened

**Environment**
- OS: 
- Browser: 
- Version:
```

### Feature Request
```
**Is your feature related to a problem?**
Description of the problem

**Describe the solution**
Your proposed solution

**Describe alternatives**
Alternative solutions
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create release on GitHub

## Questions?

Open an issue or contact the team at support@scms.edu
