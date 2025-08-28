import axios from 'axios'
import api from '../api/api'

const useEnviarRequisicaoImagemContato = ()=>{
    const enviarRequisicaoImagemContato = async(dadosEnvio)=>{
        try {
            const {data} = await axios.post(`${api.root}/enviar-imagem-contato`, 
                dadosEnvio,
            {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return true;
        } catch (err) {
            console.error(`Erro ao enviar para ${dadosEnvio.phone}:`, err);
            return false;
        }
    };
    return {enviarRequisicaoImagemContato};
};

export default useEnviarRequisicaoImagemContato;