import axios from 'axios'
import api from '../api/api'

const enviarMensagemImagemContato = async(telefones, setEnviando, setEstatusEnvio, enviarRequisicaoImagemContato, limiteEnvio, urlImagem, caption, contatoNome, contatoPhone, setMensagensEnviadas,mensagensEnviadas,setContadorEspera,cancelarEnvioRef)=>{
     if (urlImagem.trim() === '' || telefones.length === 0) {
            alert('Informe a URL da imagem e adicione pelo menos um telefone');
            return;
        };      
     setEnviando(true);
     cancelarEnvioRef.current = false;
     let mensagensEnviadasLocal = mensagensEnviadas;
        
        for(const telefoneObj of telefones){
            if(cancelarEnvioRef.current){
            setEnviando(false);
            alert('Envio cancelado!');
            return
            }
            // ⚠️ Verifica limite antes de cada envio
            // console.log(mensagensEnviadasLocal);
        if (mensagensEnviadasLocal >= limiteEnvio) {
            alert(`Limite de ${limiteEnvio} mensagens atingido. Envio encerrado.`);
            break; // encerra loop
        }
            const {phone} = telefoneObj;
            //Se não for o primeiro, aguarda antes
            if(telefoneObj !== telefones[0]){
                const tempo = Math.floor(Math.random() * (10 - 5 + 1)) +5; //entre 3 e 10s
                setContadorEspera({telefone:phone,segundos:tempo});
                    for(let s = tempo; s >0;s--){
                        if(cancelarEnvioRef.current){
                        setContadorEspera({telefone:null, segundos:0});
                        setEnviando(false);
                        alert('Envio cancelado');
                        return
                        }                        
                        setContadorEspera({telefone:phone,segundos:s});
                        await new Promise((resolve)=>setTimeout(resolve, 1000));
                    }
                setContadorEspera({telefone:null, segundos:0});
                }
        //Marca como enviando
        setEstatusEnvio(prev =>({...prev, [phone]:'enviando'}));
        const payload = {
            phone:phone,
            image:urlImagem,
            caption:caption,
            viewOnce:false,
            contactName:contatoNome,
            contactPhone:contatoPhone
        };

        const resultado = await enviarRequisicaoImagemContato(payload);
        if(resultado){
            setMensagensEnviadas((prev)=>prev+1);             
            mensagensEnviadasLocal++;
            setEstatusEnvio(prev => ({ ...prev, [phone]: resultado ? 'sucesso' : 'erro' }));
            try {
             await axios.put(`${api.root}/telefones/status`,
            {phone, status: resultado ? 'enviado' : 'nao-enviado'},
            {headers: {'Content-Type': 'application/json'}}); 
            } catch (error) {
            console.error(`Erro ao atualizar status do telefone ${phone}`, error);
            }           
        }else{
            setEstatusEnvio((prev) => ({ ...prev, [phone]: 'erro' }));
        }          
        }
        setEnviando(false);
        alert('Envio concluído');        
}

export default enviarMensagemImagemContato;