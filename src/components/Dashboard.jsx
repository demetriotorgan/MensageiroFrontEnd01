import '../styles/Dashboard.css'
import mensagem from '../assets/mensagem.jpg'
import imagem from '../assets/imagem.png'
import imagemcontato from '../assets/imagemcontato.png'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleEnviarMensagem = ()=>{
    navigate('/enivar-mensagem')
  }

  const handleEnviarImagem =()=>{
    navigate('/enivar-imagem')
  }

  const handleEnviarImagemContato = ()=>{
    navigate('/enviar-imagem-contato');
  }

  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])
  return (
    <>    
      <div className='painel-funcoes'>
      <div className='card-dashboard'>
        <h2>Enviar Mensagem</h2>
        <div className='card-elementos'>
        <img src={mensagem} />
        <div className='card-descricao'>
        <p>Com nossa funcionalidade de enviar mensagens personalizadas no WhatsApp, você pode criar ou inserir uma lista de telefones e enviar mensagens em texto de forma rápida e eficiente. Isso permite que você se conecte com seus clientes, amigos ou familiares de forma personalizada e eficaz.</p>
        <button onClick={handleEnviarMensagem}>Enviar Mensagem</button>
        </div>
        </div>
      </div>

      <div className='card-dashboard'>
        <h2>Enviar Imagem</h2>
        <div className='card-elementos'>
        <img src={imagem} />
        <div className='card-descricao'>
        <p>Com nossa funcionalidade de enviar imagens com legendas personalizadas no WhatsApp, você pode criar ou inserir uma lista de telefones e enviar imagens promocionais com legendas personalizadas em texto de forma rápida e eficiente. Isso permite que você aumente a eficácia de suas campanhas de marketing e se conecte com seus clientes de forma mais atraente.</p>
        <button onClick={handleEnviarImagem}>Enviar Imagem</button>
        </div>
        </div>
      </div>

      <div className='card-dashboard'>
        <h2>Enviar Imagem e Contato</h2>
        <div className='card-elementos'>
        <img src={imagemcontato} />
        <div className='card-descricao'>
        <p>Com nossa funcionalidade de enviar imagens com legendas personalizadas e contatos de promoção no WhatsApp, você pode criar campanhas de vendas eficazes e divulgar seu contato para aumentar as vendas. Nossa ferramenta permite que você crie ou insira uma lista de telefones e envie imagens promocionais com legendas personalizadas e contatos de promoção, tudo em um único lugar.</p>
        <button onClick={handleEnviarImagemContato}>Enviar Imagem e Contato</button>
        </div>
        </div>
      </div>
      
      </div>
    </>
  )
}

export default Dashboard