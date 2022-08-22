// Import MUI stuff
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchPage from './pages/SearchPage';
import NavBar from './components/NavBar';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';
import { BottomNavigation } from '@mui/material';

// Define theme settings
const dark = {
  palette: {
    mode: 'dark',
  },
};
//Setting the Dark theme
//Routing
const App = () => {
  return (
    <ThemeProvider theme={createTheme(dark)}>
      <CssBaseline />
      <div className="App">
        <NavBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<SearchPage />}></Route>
            <Route path="/detail/:id" element={<DetailPage />}></Route>
          </Routes>
        </div>
      </div>
      <BottomNavigation />
    </ThemeProvider>
  );
};

export default App;
