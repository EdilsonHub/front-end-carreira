import React from "react";
import ListaProjeto from "../../components/ListaProjeto";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useProjeto } from "../../hooks/useProjeto";
import FormProjeto from "../../components/Form/FormProjeto";

function CadastroProjetosLayout() {
  const { dados, abrirFormularioProjeto } = useProjeto();

  const handleOnclickAddProjeto = () => {
    abrirFormularioProjeto();
  };

  return (
    <div>
      <Typography
        variant="h5"
        component="h2"
        color="primary"
        sx={{ textTransform: "uppercase" }}
      >
        Projetos
      </Typography>

      <Box
        component="div"
        sx={{ paddingTop: 2, paddingBottom: 2, textAlign: "right" }}
      >
        <Button
          variant="outlined"
          onClick={handleOnclickAddProjeto}
          startIcon={<AddIcon color="primary" />}
        >
          Adicionar Novo Projeto
        </Button>
      </Box>

      <Box>
        <ListaProjeto
          dados={dados.filter((n) => !n.idProjetoSuperior)}
          idProjetoSuperior=""
          labelBtnAddProjeto="Adicionar Projeto"
        />

        <FormProjeto />
      </Box>
    </div>
  );
}

export default CadastroProjetosLayout;
