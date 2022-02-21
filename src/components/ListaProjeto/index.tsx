import React, { memo, useState } from "react";
import { IDadosFormulario } from "../Form/FormProjeto";
import Projeto from "./Projeto";

interface IProps {
  idProjetoSuperior: string;
  labelBtnAddProjeto: string;
  dados: IDadosFormulario[];
}

const ListaProjeto: React.FC<IProps> = ({
  dados,
  idProjetoSuperior,
  labelBtnAddProjeto,
}) => {
  const [idProjetoAberto, setIdProjetoAberto] = useState<string | null>(null);
  console.log({ dados });

  return (
    <>
      {dados.length > 0 && (
        <div style={{ marginTop: "8px" }}>
          {dados.map((props: IDadosFormulario, index: number) => (
            <Projeto
              dadosFormulario={props}
              idProjetoAberto={idProjetoAberto}
              setIdProjetoAberto={setIdProjetoAberto}
              key={props.id}
            />
          ))}
          {/* <Button fullWidth variant="text" size="small" color="primary" onClick={() => dispatch(openNovo(idProjetoSuperior))}><AddIcon />{labelBtnAddProjeto}</Button>s */}
        </div>
      )}
    </>
  );
};

export default memo(ListaProjeto);
