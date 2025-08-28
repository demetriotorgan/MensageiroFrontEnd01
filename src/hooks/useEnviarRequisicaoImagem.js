import axios from 'axios'
import api from '../api/api'

const useEnviarRequisicaoImagem = ()=>{
    const enviarRequisicaoImagem = async(dadosEnvio)=>{
        try {
            const {data} = await axios.post(`${api.root}/enviar-imagem`, dadosEnvio,{
                headers: { "Content-Type": "application/json" }
            });
            return {sucesso: true, data}
        } catch (err) {
            console.error(`Erro ao enviar para ${dadosEnvio.phone}:`, err);
            return { sucesso: false, erro: err };
        }
    };
    return {enviarRequisicaoImagem};
};
export default useEnviarRequisicaoImagem;