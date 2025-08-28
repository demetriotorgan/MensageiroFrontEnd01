import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../api/api'

const useCarregarStatusDeEnvio = ()=>{
    const [status, setStatus] = useState([]);
    const [sent, setSent] = useState(0);
    const [received, setReceived] = useState(0);
    const [read, setRead] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const carregarStatus = async()=>{
        setCarregando(true);
        setErro(null);
        try {
            const response = await axios.get(`${api.root}/status`);
            const data = response.data;
            setStatus(data);
            setSent(data.filter((item) => item.status === "SENT").length);
            setReceived(data.filter((item) => item.status === "RECEIVED").length);
            setRead(data.filter((item) => item.status === "READ").length);
        } catch (err) {
            console.error('Erro ao carregar status de envio', err);
            setErro('Erro ao carregar status');
        }finally{
            setCarregando(false);
        }
    };

    const excluirStatus = async()=>{
        try {
            await axios.delete(`${api.root}/instancia/status`);
            await carregarStatus();
            alert('Status de envio excluidos');
        } catch (err) {
            console.error('Erro ao excluir status de envio', err);
            setErro('Erro ao excluir status');
        }
    };

    //Carega automanticamnete ao montar componente
    useEffect(()=>{
        carregarStatus();
    },[]);

    return {status, sent, received, read, carregando, erro, carregarStatus, excluirStatus};
};

export default useCarregarStatusDeEnvio;