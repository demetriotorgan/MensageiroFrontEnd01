import React from 'react'
import '../../styles/Campanha/ObjetivosEspecificos.css'

const ObjetivosEspecificos = ({categoria, objetivos, selecionados, onToggle}) => {
  return (
    <div className='objetivos-container'>
        <h2>Objetivos Específicos ({categoria})</h2>
        {objetivos.map((objetivo, index)=>(
            <div key={index} className='objetivo-item'>
                <label>
                    <input 
                    type='checkbox'
                    checked={selecionados.includes(index)}
                    onChange={()=>onToggle(index)}
                    />
                    {objetivo}
                </label>
            </div>
        ))}
    </div>
  );
};

export default ObjetivosEspecificos