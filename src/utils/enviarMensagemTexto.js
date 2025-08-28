import axios from 'axios'
import api from '../api/api'

const enviarMensagemTexto = async(telefones, mensagem, setEnviando, setStatusEnvio, setContadorEspera, enviarRequisicaoMensagem, setMensagensEnviadas, cancelarEnvioRef, handleAtualizar)=>{
    if (mensagem.trim() === '' || telefones.length === 0) {
    alert('Informe a mensagem e adicione pelo menos um telefone');
    return;
  }
  
  setEnviando(true);
  cancelarEnvioRef.current = false;

  for(const telefone of telefones){
    if(cancelarEnvioRef.current){
      setEnviando(false);
      alert('Envio cancelado!');
      return
    }
     // Se não for o primeiro, aguarda antes
    if (telefone !== telefones[0]) {
      const tempo = Math.floor(Math.random() * (10 - 3 + 1)) + 3; // entre 3 e 10s
      setContadorEspera({ telefone, segundos: tempo });
      for (let s = tempo; s > 0; s--) {
        if(cancelarEnvioRef.current){
          setContadorEspera({telefone:null, segundos:0});
          setEnviando(false);
          alert('Envio cancelado');
          return
        }
        setContadorEspera({ telefone, segundos: s });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setContadorEspera({ telefone: null, segundos: 0 });
    }
    // Marca como enviando
    setStatusEnvio((prev) => ({ ...prev, [telefone]: 'enviando' }));
    const resultado = await enviarRequisicaoMensagem(telefone, mensagem);

     if (resultado) {
      setStatusEnvio((prev) => ({ ...prev, [telefone]: 'sucesso' }));
      try {
        await axios.put(`${api.root}/telefones/status`,{
          phone:telefone,
          status:'enviado',
        });
        setMensagensEnviadas((prev)=> prev+1);
        handleAtualizar();
      } catch (err) {
        console.error(`Erro ao atualizar status do telefone ${telefone}`, err);
      }
    } else {
      setStatusEnvio((prev) => ({ ...prev, [telefone]: 'erro' }));
    }
  }
  setEnviando(false);
  alert('Envio concluído');
};

export default enviarMensagemTexto;
