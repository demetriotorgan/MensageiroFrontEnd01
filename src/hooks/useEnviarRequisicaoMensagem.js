import { useState, useCallback } from "react";
import axios from 'axios';
import api from '../api/api';

const useEnviarRequisicaoMensagem = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const enviarRequisicaoMensagem = useCallback(async(telefone, mensagem)=>{
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const {data} = await axios.post(`${api.root}/enviar`,{
                phone: telefone,
                message: mensagem,
            },{
                headers:{
                    'Content-Type': 'application/json',
                },
            });
            setResponse(data);
            setLoading(false);
            return true; //Sucesso no envio
        } catch (err) {
            setError(err);
            setLoading(false);
            return false; //falha no envio
        }
    },[]);
    return {enviarRequisicaoMensagem, loading, error, response};
};

export default useEnviarRequisicaoMensagem;
