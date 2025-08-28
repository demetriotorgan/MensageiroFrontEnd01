import axios from 'axios'
import { useEffect, useState } from 'react';
import api from '../../api/api'

const useCarregarCampanhas = ()=>{
    const [campanhas, setCampanhas] = useState([]);
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const carregarCampanhas = async()=>{
        setCarregando(true);
        try {
            const res = await axios.get(`${api.root}/campanhas`);
            setCampanhas(res.data);
        } catch (error) {
            setErro('Erro ao carregar lista de campanhas')
            console.error(error);
        }finally{
            setCarregando(false);
        }
    };
    useEffect(()=>{
        carregarCampanhas();
    },[])
    return {campanhas, erro, carregando, carregarCampanhas}
};

export default useCarregarCampanhas;