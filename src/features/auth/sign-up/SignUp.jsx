import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';

import { GoogleIcon, FacebookIcon, SitemarkIcon } from './components/CustomIcons';
import useSignUp from "../useSignUp"
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  overflow: 'visible',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',

  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const { isLoading, signUp } = useSignUp()

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const username = document.getElementById('username');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (!firstName.value || firstName.value.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage('Vui lòng nhập Họ.');
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage('');
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Vui lòng nhập Tên.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    if (!username.value || username.value.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage('Vui lòng nhập tên đăng nhập.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usernameError || firstNameError || lastNameError || emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    signUp({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    })
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Đăng ký tài khoản
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName" sx={{ fontSize: "1.5rem" }}>Họ</FormLabel>
              <TextField
                required
                fullWidth
                id="firstName"
                placeholder="Nguyễn"
                name="firstName"
                autoComplete="firstName"
                variant="outlined"
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                FormHelperTextProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="lastName" sx={{ fontSize: "1.5rem" }}>Tên</FormLabel>
              <TextField
                required
                fullWidth
                id="lastName"
                placeholder="Văn A"
                name="lastName"
                autoComplete="lastName"
                variant="outlined"
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                FormHelperTextProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username" sx={{ fontSize: "1.5rem" }}>Tên đăng nhập</FormLabel>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                placeholder="username"
                error={usernameError}
                helperText={usernameErrorMessage}
                color={usernameError ? 'error' : 'primary'}
                InputProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                FormHelperTextProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" sx={{ fontSize: "1.5rem" }}>Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                FormHelperTextProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password" sx={{ fontSize: "1.5rem" }}>Mật khẩu</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  sx: { fontSize: "1.5rem" },
                }}
                FormHelperTextProps={{
                  sx: { fontSize: "1.5rem" },
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              sx={{ fontSize: "1.5rem", padding: "20px" }}
            >
              Đăng ký
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ fontSize: "1.5rem", color: 'text.secondary' }}>Hoặc</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Đăng ký với Google')}
              startIcon={<GoogleIcon />}
              sx={{ fontSize: "1.5rem", padding: "20px" }}
            >
              Đăng ký với Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Đăng ký với Facebook')}
              startIcon={<FacebookIcon />}
              sx={{ fontSize: "1.5rem", padding: "20px" }}
            >
              Đăng ký với Facebook
            </Button>
            <Typography sx={{ fontSize: "1.5rem", textAlign: 'center' }}>
              Bạn đã có tài khoản?{' '}
              <Link
                href="/auth/login"
                variant="body2"
                sx={{ fontSize: "1.5rem", alignSelf: 'center' }}
              >
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme >
  );
}
