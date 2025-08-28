import { useEffect, useState } from "react"
import api from '../api/api';
import axios from "axios";

const useCarregarListaTelefonesSalvos = ()=>{
    const [telefones, setTelefones] = useState([]);
    const [enviados, setEnviados] = useState(0);
    const [naoEnviados, setNaoEnviados] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const carregarTelefones = async()=>{
        setCarregando(true);
        setErro(null);
        try {
            const response = await axios.get(`${api.root}/listar-telefones`);
            const data = response.data;
            const listaDeTelefones = data
                .filter((t) => t.status === 'nao-enviado')
                .map((t)=> t.phone);
            setTelefones(listaDeTelefones);
            
            const enviadosCount = data.filter((t)=>t.status === 'enviado').length;
            const naoEnviadoCount = data.filter((t)=>t.status === 'nao-enviado').length;

            setTelefones(listaDeTelefones);
            setEnviados(enviadosCount);
            setNaoEnviados(naoEnviadoCount);
            
            //Retorna os dados
            return {listaDeTelefones, enviadosCount, naoEnviadoCount}
        } catch (error) {
            console.error('Erro ao carregar telefones', error);
            setErro('Erro ao carregar telefones');
            return null;
        }finally{
            setCarregando(false);
        }
    };

    //Carregar na montagem
    useEffect(()=>{
        carregarTelefones();
    },[]);
    return {telefones, setTelefones, enviados, naoEnviados, carregando, erro, carregarTelefones, setEnviados, setNaoEnviados};
};

export default useCarregarListaTelefonesSalvos;