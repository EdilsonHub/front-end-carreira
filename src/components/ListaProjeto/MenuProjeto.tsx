import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LightTooltip from "../LightTooltip";
import { useProjeto } from "../../hooks/useProjeto";

interface ITooltips {
  adicionar: string;
  editar: string;
  deletar: string;
  agendar: string;
}

interface IProps {
  idProjeto: string;
  nomeProjeto: string;
  tooltips: ITooltips;
  projetoConcluido: boolean;
}

const MenuProjeto: React.FC<IProps> = ({
  idProjeto,
  tooltips,
  nomeProjeto,
  projetoConcluido,
}) => {
  const { adicionar, editar, deletar /*, agendar */ } = tooltips;
  const {
    projetos: { remover: removerProjeto },
    formulario: { cadastrarSubProjeto, editar: editarProjeto },
  } = useProjeto();

  const handleOnclickAdd = () => {
    cadastrarSubProjeto(idProjeto, nomeProjeto);
  };

  const handleOnclikEdit = () => {
    editarProjeto(idProjeto, nomeProjeto);
  };

  const handleOnclickRemove = () => {
    removerProjeto(idProjeto);
  };

  return (
    <>
      <LightTooltip title={adicionar} placement="top-start">
        <IconButton onClick={handleOnclickAdd}>
          <AddIcon color="primary" />
        </IconButton>
      </LightTooltip>
      {!projetoConcluido && (
        <>
          <LightTooltip title={editar} placement="top-start">
            <IconButton onClick={handleOnclikEdit}>
              <EditIcon color="primary" />
            </IconButton>
          </LightTooltip>

          <LightTooltip title={deletar} placement="top-start">
            <IconButton onClick={handleOnclickRemove}>
              <DeleteIcon color="error" />
            </IconButton>
          </LightTooltip>
        </>
      )}
      {/* <LightTooltip title={agendar} placement="top-start">
                <IconButton>
                    <AccessTimeIcon color="secondary" />
                </IconButton>
            </LightTooltip> */}
    </>
  );
};

export default MenuProjeto;
