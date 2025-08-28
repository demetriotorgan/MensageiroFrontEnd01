import axios from 'axios'
import api from '../api/api'
import { useState } from 'react'

const useRemoverTelefoneImagem = ()=>{
    const [removendo, setRemovendo] = useState(false);
    const [erro, setErro] = useState(null);

    const removerTelefoneImagem = async(telefone, telefones, setTelefones)=>{
        setRemovendo(true);
        try {
            const response = await axios.delete(`${api.root}/telefones/${telefone}`);
            if(response.status === 200){
                setTelefones(telefones.filter((tel)=> tel.phone !==telefone));    
                alert('Telefone excluido com sucesso!');
            }else{
                console.error('Erro ao remover telefone');
                setErro('Erro ao remover Telefone');
            }
        } catch (error) {
            console.error('Erro ao remover telefone: ', error);
            setErro('Erro ao remover Telefone');
        }finally{
            setRemovendo(false);
        }
    };
    return {removerTelefoneImagem, removendo, erro};
};

export default useRemoverTelefoneImagem;