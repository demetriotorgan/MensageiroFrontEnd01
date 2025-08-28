import React, { useEffect, useState } from 'react'
import '../styles/EnviarImagem.css'
import whatson from '../assets/whatson.png'
import loading from '../assets/loading.gif'
import checked from '../assets/check.png'
import useAdicionarTelefoneImagem from '../hooks/useAdicionarTelefoneImagem'
import useRemoverTelefoneImagem from '../hooks/useRemoverTelefoneImagem'
import useEnviarRequisicaoImagem from '../hooks/useEnviarRequisicaoImagem'
import enviarMensagemImagem from '../utils/enivarMensagemImagem'
import useCarregarLista from '../hooks/usecarregarLista'
import {useRef} from 'react'


const ListaTelefonesImagem = ({telefones, setTelefones, carregarTelefones,carregandoLista}) => {                       
        const [enviando, setEnviando] = useState(false);
        const [statusEnvio, setEstatusEnvio] = useState({});
        const [mensagensEnviadas, setMensagensEnviadas] = useState(0);
        const [contadorEspera, setContadorEspera] = useState({telefone:null, segundos:0});        
        
        const [contadorEnvio, setContadorEnvio] = useState(0);
        const limiteEnvio = 250;
        const cancelarEnvioRef = useRef(false);

        //hooks
        const {telefoneAtual, setTelefoneAtual, urlImagem, setUrlImagem, caption, setCaption, adicionarTelefoneImagem, erroAoAdicionarTelefone, loadingAdicionarTelefone} = useAdicionarTelefoneImagem(telefones, setTelefones);
        const {removerTelefoneImagem, removendo} = useRemoverTelefoneImagem();
        const {enviarRequisicaoImagem} = useEnviarRequisicaoImagem();
        const {telefonesCarregados, erro, sucesso, carregarLista} = useCarregarLista('/telefones.json');
        
    
    const handleAdicionarTelefone = ()=>{
        adicionarTelefoneImagem();
    }
    
    const handleRemoverTelefone = (telefone)=>{
        removerTelefoneImagem(telefone, telefones, setTelefones);
    }

    const delayAleatorio = (min, max) =>{
        const tempo = Math.floor(Math.random() * (max-min +1)) + min;
        return new Promise((resolve)=>setTimeout(resolve,tempo));
    }
    
    const handleEnviarMensagem = async()=>{
        await enviarMensagemImagem(telefones, urlImagem, setEnviando, setEstatusEnvio, setContadorEspera, enviarRequisicaoImagem, contadorEnvio,limiteEnvio, caption,setMensagensEnviadas, cancelarEnvioRef);
    };

    const handleCarregarLista = () => {        
        carregarLista();                
    };

    const handleCancelarEnvio = ()=>{
        cancelarEnvioRef.current = true;
    }
    
useEffect(()=>{
    if(telefonesCarregados === null) return    

    if(telefonesCarregados.length > 0){
    const telefonesDaLista = telefonesCarregados
        .map(telefone=>({
            phone:telefone,
            image:urlImagem,
            caption:caption,
            viewOnce:false,
        }));
        setTelefones(telefonesDaLista);
        console.log(telefonesDaLista);
    }else{
        alert('Todos os telefones salvos já foram enviados/TC')                
    }
    
},[telefonesCarregados]);

useEffect(()=>{
    if(sucesso){
        alert('Lista Carregada com sucesso')
    }
    if(erro){
        alert(erro);
    }
},[sucesso,erro])

useEffect(()=>{    
  carregarTelefones();
},[])
    
  return (
    <>
    <div className='painel-envio'>
            <h2>Enviar Imagem</h2>
            
            <input 
            type='text'
            placeholder='Digite o telefone'
            value={telefoneAtual}
            onChange={(e)=>setTelefoneAtual(e.target.value)}
            />

            <input 
            type='text'
            placeholder='Coloque aqui a URL da imagem'
            value={urlImagem}
            onChange={(e)=>setUrlImagem(e.target.value)}
            />

            <textarea 
            placeholder='Digite a mensagem a ser enviada'
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
            rows='4'
            cols='50'
        />
            <button onClick={handleAdicionarTelefone}>Adicionar</button>            
            
            {urlImagem && caption ? 
            <div className='painel-visualizacao'>
                <img src={urlImagem} alt="" />
                <p>{caption}</p>
            </div> : ''}      
            
            <button onClick={handleEnviarMensagem} disabled={enviando}>
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
                {telefones.map((telObj, i)=>(
                    <li key={`${telObj.phone}-${i}`}>    
                        <div className='telefone-info'>
                        <img src={whatson} alt='WhatsOn'/>
                        <span>{telObj.phone}</span>                        
                        {telObj.status === 'enviado' && <img src={checked}/>}
                        {statusEnvio[telObj.phone] === 'enviando' && <img src={loading} alt='Enviando'/>}
                        {statusEnvio[telObj.phone] === 'sucesso' && <img src={checked} alt='Sucesso'/>}
                        {statusEnvio[telObj.phone] === 'erro' && <img src={erro} alt='Erro'/>}
                        </div>
    
                        {contadorEspera.telefone === telObj.phone && (
                            <div className='contador-espera'>
                                Aguardando {contadorEspera.segundos}s para enviar...
                            </div>
                        )}
                        <button onClick={()=>handleRemoverTelefone(telObj.phone)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleCarregarLista}>Carregar Lista</button>
        </div>
        </>    
  )
}

export default ListaTelefonesImagem