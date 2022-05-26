import {Container, CssBaseline, ThemeProvider} from '@mui/material';
import Navbar from './components/Navbar.jsx';
import StickyFooter from './components/StickyFooter.jsx';
import themeMain from './config/themeMain';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreatePerson from './components/Person/CreatePerson.jsx';
import ListPeople from './components/Person/ListPeople.jsx';
import ListRegistrations from './components/Registration/ListRegistrations.jsx';
import CreateRegistration from './components/Registration/CreateRegistration.jsx';
import NotFound from './components/Errors/404.jsx';

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />
      <Router>
          <Navbar/>
          <Container>
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route exact path="/" />
              <Route exact path="/registration/create" element={<CreateRegistration/>}/>
              <Route exact path="/people" element={<ListPeople/>} />
              <Route exact path="/people/create" element={<CreatePerson/>} />
              <Route exact path="/registrations" element={<ListRegistrations/>} />
            </Routes>
          </Container>
          <StickyFooter></StickyFooter>
      </Router>
    </ThemeProvider>
  );
}

export default App;
