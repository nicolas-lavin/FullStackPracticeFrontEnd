import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import themeMain from './config/themeMain';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Registration from './components/Auth/Registration.jsx';
import MainLayoutRoutes from './components/Layout/MainLayoutRoutes';
import NotFound from './components/Errors/404.jsx';

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />
      <Router>
          <Container maxWidth={false} disableGutters={true}>
            <Routes>
              <Route exact path="/login/sign-in" element={<Login/>} />
              <Route exact path="/login/sign-up" element={<Registration/>} />
              <Route path="/app/*" element={<MainLayoutRoutes />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
