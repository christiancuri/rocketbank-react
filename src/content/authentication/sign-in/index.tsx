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

function SignInForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isAuthenticated) navigate('/');

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
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
    if (!(email && password)) return setAlert(`Type your email and password`);
    setLoading(true);
    try {
      await auth.signin(email, password);
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

  const onBlur = () => {};

  return (
    <form noValidate onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        error={false}
        fullWidth
        margin="normal"
        autoFocus
        helperText=""
        label="Email"
        name="email"
        onBlur={onBlur}
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
        onBlur={onBlur}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
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
        {loading ? 'Loading' : 'Sign in'}
      </Button>
    </form>
  );
}

function LoginBasic() {
  return (
    <>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Logo />
            <Card sx={{ mt: 3, px: 4, pt: 5, pb: 3 }}>
              <Box>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  Rocket Bank - Sign In
                </Typography>
              </Box>
              <SignInForm />
              <br />
              <Box>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
                </Typography>
              </Box>
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default LoginBasic;
