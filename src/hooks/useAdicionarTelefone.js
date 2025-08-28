import axios from 'axios'
import api from '../api/api'
import { useState } from 'react'

const useAdicionarTelefone = ()=>{
    const [adicionando, setAdicionando] = useState(false);
    const [erro, setErro] = useState(null);

    const adicionarTelefone = async(telefone, telefones, setTelefones)=>{
        setAdicionando(true);
        try {
            const response = await axios.post(`${api.root}/telefones`,{
                phone:telefone
            },{
                headers: { "Content-Type": "application/json" }
            });
            if(response.status === 200 || response.status === 201){
                setTelefones([...telefones, telefone]);
                alert('Telefone salvo na lista com sucesso');
            }else{
                setErro('Erro ao adicionar Telefone');
            }
        } catch (err) {
            if(err.response){
                setErro(`Erro ${err.response.status}: ${err.response.data}`);
            }else{
                setErro('Erro ao adicionar Telefone');
            }
            console.log(err);
        }finally{
            setAdicionando(false);
        }
    };
    return {adicionarTelefone, adicionando, erro};
};

export default useAdicionarTelefone;