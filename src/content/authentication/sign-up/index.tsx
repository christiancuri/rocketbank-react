import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from 'src/components/LogoSign';
import { useAuth } from 'src/contexts/AuthContext';

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  CircularProgress,
  Card,
  Container,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

function SignUpForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isAuthenticated) navigate('/');

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [alert, setAlert] = useState<string>();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/');
  }, [auth]);

  useEffect(() => {
    if (loading) {
      setError('');
      setAlert('');
    }
  }, [loading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return setAlert(`Type your name`);
    if (!email) return setAlert(`Type your email`);
    if (!password) return setAlert(`Type your password`);
    if (!confirmPassword) return setAlert(`Check your password confirmation`);
    if (password.trim() !== confirmPassword.trim())
      return setAlert(`Your password doesn't match`);

    setLoading(true);
    try {
      await auth.signup(name, email, password);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          error?.response?.data ||
          `Failed to sign in`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        error={false}
        fullWidth
        margin="normal"
        autoFocus
        helperText=""
        label="Your name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        variant="outlined"
      />
      <TextField
        error={false}
        fullWidth
        margin="normal"
        helperText=""
        label="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        value={email}
        variant="outlined"
      />
      <TextField
        error={false}
        fullWidth
        margin="normal"
        helperText=""
        label="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        variant="outlined"
      />
      <TextField
        error={false}
        fullWidth
        margin="normal"
        helperText=""
        label="Confirm password"
        name="confirm-password"
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        value={confirmPassword}
        variant="outlined"
      />

      {alert && <FormHelperText error>{alert}</FormHelperText>}

      <Button
        sx={{ mt: 3 }}
        color="primary"
        startIcon={loading ? <CircularProgress size="1rem" /> : null}
        disabled={loading}
        type="submit"
        fullWidth
        size="large"
        variant="contained"
      >
        {loading ? 'Loading' : 'Create Account'}
      </Button>
    </form>
  );
}

export default function SignUp() {
  return (
    <>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Logo />
            <Card sx={{ mt: 3, px: 4, pt: 5, pb: 3 }}>
              <Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  Rocket Bank - Sign Up
                </Typography>
              </Box>
              <SignUpForm />
              <br />
              <Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Already have an account? <Link to="/login">Log in</Link>
                </Typography>
              </Box>
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}
