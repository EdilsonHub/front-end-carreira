import React from 'react';

import { useSelector } from 'react-redux';
import { selectProjetos } from '../../store/Projetos.store';

const BuscaProjeto = () => {

    const projeto = useSelector(selectProjetos);

    const busca = () => {
        return (
            <>
            {
                projeto.dados.map(p => <div>{p.nome}</div>)
            }
            </>
        );
    }

    return (
        <div>{busca()}</div>
    );
}

export default BuscaProjeto;