import React, { useEffect, useState } from 'react'
import '../styles/ListaTelefones.css'
import whatson from '../assets/whatson.png'
import loading from '../assets/loading.gif'
import checked from '../assets/check.png'
import erro from '../assets/erro.png'
import useEnviarRequisicaoMensagem from '../hooks/useEnviarRequisicaoMensagem'
import enviarMensagemTexto from '../utils/enviarMensagemTexto'
import useCarregarLista from '../hooks/usecarregarLista'
import useAdicionarTelefone from '../hooks/useAdicionarTelefone'
import useRemoverTelefone from '../hooks/useRemoverTelefone'
import { useRef } from 'react'

const ListaTelefones = ({telefones, setTelefones, handleAtualizar}) => {    
    const [telefoneAtual, setTelefoneAtual] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [statusEnvio, setEstatusEnvio] = useState({});
    const [contadorEspera, setContadorEspera] = useState({telefone:null, segundos:0});
    const [mensagensEnviadas, setMensagensEnviadas] = useState(0);
    const cancelarEnvioRef = useRef(false);
    
    //Hooks    
    const {enviarRequisicaoMensagem} = useEnviarRequisicaoMensagem();
    const {telefonesCarregados, carregarLista} = useCarregarLista('/telefones.json');
    const {adicionarTelefone, adicionando, erro} = useAdicionarTelefone();
    const {removerTelefone, removendo} = useRemoverTelefone(setTelefones);


    const handleAdicionarTelefone = ()=>{
        const telefone = telefoneAtual.trim();
        if(telefone === ''){
            alter('Digite um telefone a ser adicionado');
            return
        }
        if(telefones.includes(telefone)){
            alert('Esse telefone já esta adicionado na lista');
            return
        }        
            adicionarTelefone(telefone, telefones, setTelefones);
            setTelefoneAtual('');        
    };

    const handleRemoverTelefone = (telefone)=>{
        removerTelefone(telefone, telefones, setTelefones);
    };
    
    const delayAleatorio = (min, max) =>{
        const tempo = Math.floor(Math.random() * (max-min +1)) + min;
        return new Promise((resolve)=>setTimeout(resolve,tempo));
    }

    const handleEnviarMensagemTexto = async()=>{
        await enviarMensagemTexto(telefones, mensagem, setEnviando, setEstatusEnvio, setContadorEspera, enviarRequisicaoMensagem, setMensagensEnviadas, cancelarEnvioRef, handleAtualizar);
    }    
    
const handleCarregarLista = () => {
  carregarLista();  
};

const handleCancelarEnvio = ()=>{
    cancelarEnvioRef.current = true;
}

useEffect(()=>{
    if(telefonesCarregados === null)  return;
    
    if(telefonesCarregados.length > 0){
        setTelefones(telefonesCarregados);
    }
},[telefonesCarregados]);


  return (
    <>
    <div className='painel-envio'>
        <h2>Enviar Texto</h2>        
        <input 
        type='text'
        placeholder='Digite o telefone'
        value={telefoneAtual}
        onChange={(e)=>setTelefoneAtual(e.target.value)}
        />
        <button onClick={handleAdicionarTelefone}>
        {adicionando ? <img src={loading} className='loading-icon' /> : 'Adicionar'}
        </button>        

        <textarea 
            placeholder='Digite a mensagem a ser enviada'
            value={mensagem}
            onChange={(e)=>setMensagem(e.target.value)}
            rows='4'
            cols='50'
        />
        <button onClick={handleEnviarMensagemTexto} disabled={enviando}>
        {enviando ? 'Enviando' : 'Enviar Mensagem'}
        </button>   
        {enviando ? <button onClick={handleCancelarEnvio} className='botao-cancelar'>Cancelar</button> : ''}
        
        <>
        <div className='mensagensEnviadas'>
            <p>Total: {telefones.length} </p>
            <p>Enviados: {mensagensEnviadas}</p>           
        </div>
         <div className='barra-envio'>
                <div className='barra-envio-progresso'
                style={{
                    width:`${Math.min((mensagensEnviadas / telefones.length)*100, 100)}%`
                }}></div>                    
            </div>
        </>
        <br/>
        <ul>
            {telefones.map((tel, i)=>(
                <li key={i}>
                    <div className='telefone-info'>
                    <img src={whatson} alt='WhatsOn'/>
                    <span>{tel}</span>
                    {statusEnvio[tel] === 'enviando' && <img src={loading} alt='Enviando'/>}
                    {statusEnvio[tel] === 'sucesso' && <img src={checked} alt='Sucesso'/>}
                    {statusEnvio[tel] === 'erro' && <img src={erro} alt='Erro'/>}
                    </div>

                    {contadorEspera.telefone === tel && (
                        <div className='contador-espera'>
                            Aguardando {contadorEspera.segundos}s para enviar...
                        </div>
                    )}
                    <button onClick={()=>handleRemoverTelefone(tel)}>Excluir</button>
                </li>
            ))}
        </ul>
        <button onClick={handleCarregarLista}>Carregar Lista</button>
    </div>
    </>
  )
}

export default ListaTelefones