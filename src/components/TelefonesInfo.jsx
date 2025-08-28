import React, { useEffect, useState } from 'react'
import '../styles/TelefonesInfo.css'
import send from '../assets/send.png'
import salvos from '../assets/bookmark.png'
import env from '../assets/enviado.png'
import naoenv from '../assets/time.png'
import api from '../api/api'
import axios from 'axios'

const TelefonesInfo = ({telefones, enviados, naoEnviados, handleAtualizar, setTelefones, setEnviados, setNaoEnviados}) => {

  useEffect(()=>{
  handleAtualizar()
},[telefones, enviados, naoEnviados])

  
  const excluirListaDeTelefone = async()=>{
    if(window.confirm('Tem certeza que deseja excluir a lista de telefone salva?')){
      try {
        await axios.delete(`${api.root}/telefones`);
        setTelefones([]);
        setEnviados(0);
        setNaoEnviados(0);
      } catch (err) {
        console.error('Erro ao excluir lista de telefone', err);
      }
    }
  };

  return (
    <div className='card'>
        <h2>Resumo de envio <img src={send} /></h2>
        
        <p><img src={salvos} /> <span>Telefones Salvos: </span> {telefones.length + enviados}</p>
        <p><img src={env} /> <span>Enviados: </span>  {enviados}</p>
        <p><img src={naoenv} /> <span>Não-Enviados:</span>  {naoEnviados}</p>
        
        <button onClick={handleAtualizar}>Atualizar</button>
        <button className='exlcuir-lista' onClick={excluirListaDeTelefone}>Deletar Lista</button>
    </div>
  )
};

export default TelefonesInfo