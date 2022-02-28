import React, { memo, useState } from "react";
import { IProjeto } from "../../interfaces/IProjeto";
import Projeto from "./Projeto";

interface IProps {
  idProjetoSuperior: string;
  labelBtnAddProjeto: string;
  dados: IProjeto[];
}

const ListaProjeto: React.FC<IProps> = ({
  dados,
  idProjetoSuperior,
  labelBtnAddProjeto,
}) => {
  const [idProjetoAberto, setIdProjetoAberto] = useState<string | null>(null);
  return (
    <>
      {dados.length > 0 && (
        <div style={{ marginTop: "8px" }}>
          {dados.map((props: IProjeto, index: number) => (
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
