import React from 'react';
import './App.css';
import CadastroProjetosLayout from './pages/CadastrosProjetosLayout';
import AgendaLayout from './pages/AgendaLayout';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Counter } from './components/Counter';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const NotFound = () => (
  <>
  <Box sx={{ p: 10 }}>
    <Typography variant="h3" component="h1" sx={{ color: '#666', margin: 'auto', textAlign: 'center', verticalAlign: 'center' }}>
      404 Not Found
    </Typography>
    <Link to="/" ><Typography textAlign="center">Volte para projetos</Typography></Link>
  </Box>
    </>
);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Box sx={{m: 2}}>
        <Routes>
          <Route path="/" element={<CadastroProjetosLayout />} />
          <Route path="/agendas" element={<AgendaLayout />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Box>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
