import React from 'react';
import './App.css';
import CadastroProjetosLayout from './components/CadastrosProjetosLayout./CadastrosProjetosLayout';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ptBR } from 'date-fns/locale';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <Box>
        <CadastroProjetosLayout />
      </Box>
    </LocalizationProvider>
  );
}

export default App;
