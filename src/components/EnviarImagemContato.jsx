import ListaTelefonesImagemContato from "./ListaTelefonesImagemContato"
import useCarregarTelefoneImagemContato from "../hooks/useCarregarListaTelefoneImagemContato"
import { useEffect, useState } from "react";
import TelefonesInfo from "./TelefonesInfo";
import EnviosInfo from "./EnviosInfo";

const EnviarImagemContato = () => { 
const {telefones: hookTelefones, enviados: hookEnviados, naoEnviados:hookNaoEnviados, carregarTelefonesImagemContato, carregandoLista} = useCarregarTelefoneImagemContato();

// States do Dashboard para controlar os filhos
      const [telefones, setTelefones] = useState([]);
      const [enviados, setEnviados] = useState(0);
      const [naoEnviados, setNaoEnviados] = useState(0);

      const handleAtualizar = async () => {
    const dados = await carregarTelefonesImagemContato();
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

    <ListaTelefonesImagemContato 
    telefones={telefones}
    setTelefones={setTelefones}
    carregarTelefonesImagemContato={carregarTelefonesImagemContato}
    carregandoLista={carregandoLista}
    />
    </>
  )
}

export default EnviarImagemContato