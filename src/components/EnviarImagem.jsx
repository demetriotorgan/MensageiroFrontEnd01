import '../styles/EnviarImagem.css'
import ListaTelefonesImagem from './ListaTelefonesImagem'
import useCarregarListaTelefoneImagem from '../hooks/useCarregarListaTelefoneImagem'
import { useEffect, useState } from 'react';
import TelefonesInfo from './TelefonesInfo';
import EnviosInfo from './EnviosInfo';

const EnviarImagem = () => {           
    const {telefones: hookTelefones, enviados: hookEnviados, naoEnviados:hookNaoEnviados, carregarTelefones, carregandoLista} = useCarregarListaTelefoneImagem();

    // States do Dashboard para controlar os filhos
      const [telefones, setTelefones] = useState([]);
      const [enviados, setEnviados] = useState(0);
      const [naoEnviados, setNaoEnviados] = useState(0);
      
  const handleAtualizar = async () => {
    const dados = await carregarTelefones();
    if (dados) {
      setTelefones(dados.novosTelefones);
      setEnviados(dados.enviadosCount);
      setNaoEnviados(dados.naoEnviadosCount);
    }
};

// Atualiza os states do Dashboard sempre que o hook muda
  useEffect(() => {
    setTelefones(hookTelefones);
    setEnviados(hookEnviados);
    setNaoEnviados(hookNaoEnviados);
  }, [hookTelefones, hookEnviados, hookNaoEnviados]);

  return (
    <>
    <TelefonesInfo
    telefones={telefones}
    enviados={enviados}
    naoEnviados={naoEnviados}
    handleAtualizar={handleAtualizar}
    setTelefones={setTelefones}
    setEnviados={setEnviados}
    setNaoEnviados={setNaoEnviados}    
    />

    <EnviosInfo/>

    <ListaTelefonesImagem
    telefones={telefones}
    setTelefones={setTelefones} 
    carregarTelefones={carregarTelefones}
    carregandoLista={carregandoLista}
    />
    </>
  )
}

export default EnviarImagem