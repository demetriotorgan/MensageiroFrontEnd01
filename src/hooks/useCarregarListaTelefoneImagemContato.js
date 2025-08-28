import axios from 'axios'
import api from '../api/api'
import { useEffect, useState } from 'react';

const useCarregarTelefoneImagemContato = ()=>{
    const [telefones, setTelefones] = useState([]);
    const [enviados, setEnviados] = useState(0);
    const [naoEnviados, setNaoEnviados] = useState(0);
    const [carregandoLista, setCarregandoLista] = useState(false);
    const [erroLista, setErroLista] = useState(null);

    const carregarTelefonesImagemContato =async()=>{
        setCarregandoLista(true);
        try {
            const response = await axios.get(`${api.root}/listar-telefones`);
            const novosTelefones = response.data
            .filter(telefone => telefone.status === 'nao-enviado')
        .map(telefone => ({
          phone: telefone.phone,
          image: '',
          caption: '',
          viewOnce: false,
          contactName:'',
          contactPhone:''
        }));        
        setTelefones(novosTelefones);
        
      const enviadosCount = response.data.filter((t)=>t.status === 'enviado').length;
      const naoEnviadosCount = response.data.filter((t)=>t.status === 'nao-enviado').length;
      
      setEnviados(enviadosCount);
      setNaoEnviados(naoEnviadosCount);
      //Retorna os dados
      return {novosTelefones, enviadosCount, naoEnviadosCount }
        } catch (error) {
            console.error('Erro ao carregar lista do banco de dados', error);
            setErroLista('Erro ao carregar lista de telefones');
            return null;
        }finally{
            setCarregandoLista(false);
        }
    };
    //Carrega na montagem
    useEffect(()=>{
        carregarTelefonesImagemContato();
    },[])
    return {carregarTelefonesImagemContato, telefones, setTelefones, enviados, setEnviados, naoEnviados, setNaoEnviados, carregandoLista, setCarregandoLista, erroLista, setErroLista}
};

export default useCarregarTelefoneImagemContato;