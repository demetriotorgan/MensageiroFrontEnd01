import axios from 'axios'
import { useState } from 'react';
import api from '../../api/api'

const useSalvarCampanha = ()=>{
    const [salvando, setSalvando]= useState(false);
    const [formData, setFormData] = useState({
    nomeCliente: '',
    empresa: '',
    ramo: '',
    cidade: '',
    telefone: '',
    dataInicio: '',
    duracao: '',
    nomeCampanha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const salvarCampanha = async()=>{
        setSalvando(true);
 try {
      const response = await axios.post(`${api.root}/cadastrar-campanha`, formData);
      alert('Campanha salva com sucesso');
      setFormData({
        nomeCliente: '',
        empresa: '',
        ramo: '',
        cidade: '',
        telefone: '',
        dataInicio: '',
        duracao: '',
        nomeCampanha: ''
      });
    } catch (error) {
      console.error('Erro', error);
      alert('Falha ao cadastrar campanha');
    }finally{
        setSalvando(false);
        window.scrollTo({ top: 968, behavior: 'smooth' });
    }
    };
    return {formData, handleChange,salvarCampanha, salvando}
};

export default useSalvarCampanha;