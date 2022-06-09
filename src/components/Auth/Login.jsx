import { Checkbox, Link, Paper, Box, Grid, Typography, FormControlLabel, TextField, CssBaseline, Button, Avatar, CircularProgress, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BackgroundLogin from '../../assets/images/background_login.jpg';
import { useFormik } from 'formik';
import loginValidations from './validations/Login';
import { useDispatch, useSelector } from 'react-redux';
import {loginPending, loginSuccess, loginFail} from '../../redux/slices/loginSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/authService.js'
import { getUserProfile } from '../../redux/actions/userAction';

const theme = createTheme();

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuth, error } = useSelector(state => state.login);
  
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: loginValidations,
    onSubmit: async (formData) => {
      dispatch(loginPending());
      try {
        const data = await userLogin(formData);
        if (data){
          dispatch(loginSuccess());
          dispatch(getUserProfile());
          navigate('/');
        } 
      } catch (error) {
        dispatch(loginFail(error.response.data.message));
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url('+BackgroundLogin+')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Iniciar Sesión</Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Usuario"
                name="userName"
                autoComplete="userName"
                value={formik.values.userName || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && Boolean(formik.errors.userName)} 
                helperText={formik.touched.userName && formik.errors.userName}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)} 
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuerdame"
              />
              {error && <Alert severity="error">{error}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? <CircularProgress color="inherit"/> : "Iniciar Sesión"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidó su contraseña?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link component={NavLink} to="/login/sign-up" variant="body2">
                    {"¿No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}