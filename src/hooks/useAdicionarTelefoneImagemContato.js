import axios from 'axios'
import api from '../api/api'
import { useState } from 'react'

const useAdicionarTelefoneImagemContato = (telefones, setTelefones)=>{
    const [telefoneAtual, setTelefoneAtual] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [caption, setCaption] = useState('');
    const [contatoNome, setContatoNome] = useState('');
    const [contatoPhone, setContatoPhone] = useState('');
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const adicionarTelefoneImagemContato = async()=>{
        if(telefoneAtual.trim() !== '' && !telefones.some(t => t.phone === telefoneAtual) && (urlImagem.trim() !=='' || caption.trim() !== '')){
            const novoTelefone = {
                phone: telefoneAtual.trim(),
                image:urlImagem,
                caption: caption,
                viewOnce:false,
                contactName:contatoNome,
                contactPhone:contatoPhone
            };
        setCarregando(true);
        try {
            const response = await axios.post(`${api.root}/telefones`,
                {phone: novoTelefone.phone},
                {headers: { "Content-Type": "application/json" }}
            );
            if(response.status === 200 || response.status === 201){
            setTelefones([...telefones, novoTelefone]);
            alert('Telefone salvo com sucesso')
        }else{
            setErroAoAdicionarTelefone(`Erro ao salvar telefone: ${response.status}`);
        }
        } catch (error) {
            setErro(error.message);
        }finally{
            setCarregando(false);
        }        
        }
    };
    return {telefoneAtual, setTelefoneAtual, urlImagem, setUrlImagem, caption, setCaption, erro, carregando, adicionarTelefoneImagemContato, contatoNome, setContatoNome, contatoPhone, setContatoPhone};
}

export default useAdicionarTelefoneImagemContato;