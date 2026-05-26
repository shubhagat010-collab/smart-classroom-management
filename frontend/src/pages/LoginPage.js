import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import axios from 'axios';
import './LoginPage.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState('student');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  
  // Common state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!loginEmail || !loginPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email: loginEmail, password: loginPassword }
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (signupPassword.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (signupPassword !== signupConfirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role: signupRole,
        }
      );

      setSuccess('Account created successfully! Please login to continue.');
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupConfirmPassword('');
      setSignupRole('student');

      setTimeout(() => {
        setTabValue(0);
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-page-container">
      <Container maxWidth="sm" className="login-container">
        <Card className="auth-card" elevation={8}>
          <Box className="auth-header">
            <Typography variant="h3" className="app-title">
              SCMS
            </Typography>
            <Typography variant="body1" className="app-subtitle">
              Smart Classroom Management Software
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="auth-tabs"
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                },
              }}
            >
              <Tab label="Sign In" id="auth-tab-0" aria-controls="auth-tabpanel-0" />
              <Tab label="Create Account" id="auth-tab-1" aria-controls="auth-tabpanel-1" />
            </Tabs>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mx: 2, mt: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mx: 2, mt: 2 }}>
              {success}
            </Alert>
          )}

          <TabPanel value={tabValue} index={0}>
            <Box component="form" onSubmit={handleLogin} sx={{ px: 2, pb: 2 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#1976d2', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="you@example.com"
              />
              <TextField
                fullWidth
                label="Password"
                type={showLoginPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#1976d2', mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        edge="end"
                      >
                        {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2, color: '#666' }}>
                Don't have an account?{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#1976d2',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => setTabValue(1)}
                >
                  Create one
                </Typography>
              </Typography>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box component="form" onSubmit={handleSignup} sx={{ px: 2, pb: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#1976d2', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="John Doe"
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#1976d2', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="you@example.com"
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Password"
                type={showSignupPassword ? 'text' : 'password'}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#1976d2', mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        edge="end"
                      >
                        {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="At least 6 characters"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type={showSignupConfirmPassword ? 'text' : 'password'}
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#1976d2', mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                        edge="end"
                      >
                        {showSignupConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Confirm your password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3, py: 1.5, fontSize: '1rem', fontWeight: 600 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2, color: '#666' }}>
                Already have an account?{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#1976d2',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => setTabValue(0)}
                >
                  Sign in
                </Typography>
              </Typography>
            </Box>
          </TabPanel>
        </Card>

        <Typography variant="body2" align="center" sx={{ mt: 3, color: '#999' }}>
          © 2024 SCMS. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;
