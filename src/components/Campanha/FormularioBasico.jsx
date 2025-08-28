import React, { useState } from 'react'
import '../../styles/Campanha/FormularioBasico.css'
import useSalvarCampanha from '../../hooks/Campanha/useSalvarCampanha'
import loading from '../../assets/loading.gif'

const FormularioBasico = () => {
const {formData, handleChange, salvarCampanha, salvando} = useSalvarCampanha();

  return (
    <div className='painel-servico'>
        <div className='formulario-basico'>
          <h2>Cadastrar Nova Campanha</h2>

          <input 
          type='text'
          name='nomeCliente'
          placeholder='Nome do Cliente'
          value={formData.nomeCliente}
          onChange={handleChange}
          />

          <input 
          type='text'
          name='empresa'
          placeholder='Nome da Empresa'
          value={formData.empresa}
          onChange={handleChange}
          />

          <input 
          type='text'
          name='ramo'
          placeholder='Ramo ou nicho'
          value={formData.ramo}
          onChange={handleChange}
          />

          <input 
          type='text'
          name='cidade'
          placeholder='Cidade'
          value={formData.cidade}
          onChange={handleChange}
          />

          <input 
          type='text'
          name='telefone'
          placeholder='Telefone'
          value={formData.telefone}
          onChange={handleChange}
          />

          <label>Data de Início
          <input 
          type='date'          
          name='dataInicio'
          value={formData.dataInicio}
          onChange={handleChange}
          />
          </label>

          <label>Dias
          <input 
          placeholder='Tempo de duração'
          type='number'
          name='duracao'
          value={formData.duracao}
          onChange={handleChange}
          />
          </label>         
          
          <input 
          type='text'
          placeholder='Nome da campanha'
          name='nomeCampanha'
          value={formData.nomeCampanha}
          onChange={handleChange}
          />
          <button type="button" onClick={salvarCampanha} disabled={salvando}>Salvar Campanha</button>
          {salvando ? <img src={loading} className='loading-image'/> : ''}
        </div>
    </div>
  )
}

export default FormularioBasico