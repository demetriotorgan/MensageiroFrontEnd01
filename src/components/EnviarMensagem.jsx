import React, { useEffect, useState } from 'react'
import ListaTelefones from './ListaTelefones'
import TelefonesInfo from './TelefonesInfo'
import EnviosInfo from './EnviosInfo'
import useCarregarListaTelefonesSalvos from '../hooks/useCarregarListaTelefonesSalvos'


const EnviarMensagem = () => {
  const { telefones: hookTelefones, enviados: hookEnviados, naoEnviados: hookNaoEnviados, carregarTelefones } = useCarregarListaTelefonesSalvos();

  // States do Dashboard para controlar os filhos
  const [telefones, setTelefones] = useState([]);
  const [enviados, setEnviados] = useState(0);
  const [naoEnviados, setNaoEnviados] = useState(0);

  const handleAtualizar = async () => {
  const dados = await carregarTelefones();
  if (dados) {
    setTelefones(dados.listaDeTelefones);
    setEnviados(dados.enviadosCount);
    setNaoEnviados(dados.naoEnviadoCount);
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
    <EnviosInfo telefones={telefones} />    
    
    <ListaTelefones 
    telefones={telefones} 
    setTelefones={setTelefones} 
    handleAtualizar={handleAtualizar}  />
    </>
  )
}

export default EnviarMensagem