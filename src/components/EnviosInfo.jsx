import React, { useEffect, useState } from 'react'
import '../styles/EnviosInfo.css'
import send from '../assets/send.png'
import useCarregarStatusDeEnvio from '../hooks/useCarregarStatusDeEnvio'

const EnviosInfo = () => {
const {sent, received, read, carregando, erro, carregarStatus, excluirStatus} = useCarregarStatusDeEnvio();

  return (
    <div className='painel-status'>
        <h2>Status de Envio <img src={send}/></h2>
        <div className='status-card'>
            <p>Enviado: {sent}</p>
            <p>Recebido: {received}</p>
            <p>Visualizado: {read}</p>
        </div>
        <button onClick={carregarStatus}>Atualizar</button>
        <button className='botao-excluir' onClick={()=>{
            if (window.confirm('Tem certeza que deseja excluir todos os registros de status?')) {
             excluirStatus();
            }
        }}>Excluir</button>
    </div>
  )
}

export default EnviosInfo