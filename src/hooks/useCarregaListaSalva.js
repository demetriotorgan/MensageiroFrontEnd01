import axios from 'axios'
import api from '../api/api'
import { useEffect, useState } from 'react'

const useCarregarListaSalva = ()=>{
    const [telefones, setTelefones] = useState([]);
    
    useEffect(()=>{
        const carregarTelefonesSalvos = async()=>{
            try {
                const response = await axios.get(`${api.root}/listar-telefones`);
                const listaDeTelefones = response.data.map(telefone => telefone.phone);
                setTelefones(listaDeTelefones);
                
            } catch (error) {
                console.error('Erro ao carregar lista de telefones do banco de dados', error);
            }
        };
        carregarTelefonesSalvos();
    },[]);
    return {telefones, setTelefones};
};

export default useCarregarListaSalva;