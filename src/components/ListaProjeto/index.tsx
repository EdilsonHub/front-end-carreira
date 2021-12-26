import React from 'react';
import { IDadosFormulario } from '../Form/FormProjeto';
import Projeto from './Projeto';


interface IProps {
    idProjetoSuperior: string;
    labelBtnAddProjeto: string;
    dados: IDadosFormulario[];
}

const ListaProjeto: React.FC<IProps> = ({ dados, idProjetoSuperior, labelBtnAddProjeto }) => {



    return (
        <div>
            {
                dados.map((props: IDadosFormulario, index: number) => (
                    <Projeto key={index.toString()} {...props} />
                ))
            }
            {/* <Button fullWidth variant="text" size="small" color="primary" onClick={() => dispatch(openNovo(idProjetoSuperior))}><AddIcon />{labelBtnAddProjeto}</Button>s */}
        </div>
    );
}

export default ListaProjeto;