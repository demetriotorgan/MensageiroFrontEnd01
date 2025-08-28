import axios from 'axios'
import { useState } from 'react'
import api from '../api/api'

const useAdicionarTelefoneImagem = (telefones, setTelefones)=>{
    const [telefoneAtual, setTelefoneAtual] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [caption, setCaption] = useState('');
    const [erroAoAdicionarTelefone, setErroAoAdicionarTelefone] = useState(null);
    const [loadingAdicionarTelefone, setLoadingAdicionarTelefone] = useState(false);

    const adicionarTelefoneImagem = async()=>{
        if(telefoneAtual.trim() !== '' && !telefones.some(t => t.phone === telefoneAtual) && (urlImagem.trim() !== '' || caption.trim() !== '')){        
        const novoTelefone = {
        phone: telefoneAtual.trim(),
        image: urlImagem,
        caption: caption,
        viewOnce: false,
        };
            setLoadingAdicionarTelefone(true);
            try {
            const response = await axios.post(`${api.root}/telefones`,
                {phone: novoTelefone.phone},
                {headers: { "Content-Type": "application/json" }}
            );
            if(response.status === 200 || response.status === 201){
            setTelefones([...telefones, novoTelefone]);
            alert('Telefone salvo com sucesso');
            }else{
                setErroAoAdicionarTelefone(`Erro ao salvar telefone: ${response.status}`);
            }
            } catch (error) {
                setErroAoAdicionarTelefone(error.message);
            }finally{
                setLoadingAdicionarTelefone(false);
            }
        }
    };
    return{telefoneAtual, setTelefoneAtual, urlImagem, setUrlImagem, caption, setCaption, adicionarTelefoneImagem, erroAoAdicionarTelefone, loadingAdicionarTelefone};
};

export default useAdicionarTelefoneImagem;