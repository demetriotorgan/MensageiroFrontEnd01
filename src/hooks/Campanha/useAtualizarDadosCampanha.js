import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'

const useAtualizarCampanha = ()=>{
    const navigate = useNavigate();

    const atualizarCampanha = async(id_campanha, dados, setObjetivosSelecionados, setMetasSelecionadas, setCampanhaSelecionada)=>{
        if (!id_campanha || id_campanha.trim() === '') {
      alert('Selecione uma campanha para atualizar');
      return;
    }
    try {
      const res = await axios.put(`${api.root}/atualizar-campanha/${id_campanha}`, dados);
      console.log('Campanha Atualizada: ', res.data);
      alert('Campanha atualizada com sucesso');

      // Redirecionando
      setObjetivosSelecionados([]);
      setMetasSelecionadas([]);
      setCampanhaSelecionada(null);
      navigate('/');
    } catch (err) {
      console.error('Erro ao atulizar campanha: ', err.response?.data || err.message);
    }
    };
    return atualizarCampanha;
};
export default useAtualizarCampanha;