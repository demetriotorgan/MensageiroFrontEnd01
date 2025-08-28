import React from 'react'
import '../../styles/Campanha/MetasEspecificas.css'

const MetasEspecificas = ({categoria, metas, selecionadas, onToggle}) => {
  return (
    <div className='metas-container'>
        <h2>Metas Específicas ({categoria})</h2>
        {metas.map((meta, index)=>(
            <div key={index} className='meta-item'>
                <label>
                    <input 
                    type='checkbox'
                    checked={selecionadas.includes(index)}
                    onChange={()=>onToggle(index)}
                    />
                    {meta}
                </label>
            </div>
        ))}
    </div>
  );
};

export default MetasEspecificas