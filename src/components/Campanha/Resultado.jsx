import '../../styles/Campanha/Resultado.css'
import GraficoPizza from './GraficoPizza';
import ObjetivosEspecificos from './ObjetivosEspecificos';
import MetasEspecificas from './MetasEspecificas'
import {objetivos} from '../../utils/objetivos'
import {metas} from '../../utils/metas'
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAtualizarCampanha from '../../hooks/Campanha/useAtualizarDadosCampanha';
import useCarregarCampanhas from '../../hooks/Campanha/useCarregarCampanhas';

const Resultado = ({ respostas }) => {
  const medias = {
    grupo1: respostas.grupo1.reduce((a,b)=>a+b,0) / respostas.grupo1.length,
    grupo2: respostas.grupo2.reduce((a,b)=>a+b,0) / respostas.grupo2.length,
    grupo3: respostas.grupo3.reduce((a,b)=>a+b,0) / respostas.grupo3.length,
  };
  const vencedor = Object.entries(medias).sort((a,b)=>b[1]-a[1])[0][0];
  const navigate = useNavigate();

  //estado para objetivos especificos
  const [objetivosSelecionados, setObjetivosSelecionados] = useState([]);
  const [metasSelecionadas, setMetasSelecionadas] = useState([]);    
  const [campanhaSelecionada, setCampanhaSelecionada] = useState(null);

  //hooks
  const atualizarCampanha = useAtualizarCampanha();
  const {campanhas, erro, carregando} = useCarregarCampanhas();

  
  const toggleObjetivo = (index)=>{
    setObjetivosSelecionados(prev =>
      prev.includes(index) ? prev.filter(i => i !==index):[...prev, index]
    );
  };

  const toggleMeta = (index)=>{
    setMetasSelecionadas(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  //objeto com os dados da campanha
  const resultadoFinal = {
    campanha: campanhaSelecionada,
    categoria:vencedor,
    objetivos: objetivosSelecionados.map(i=>objetivos[vencedor][i]),
    metas:metasSelecionadas.map(i => metas[vencedor][i]),
  }

  const handleAtualizarDados = ()=>{
    atualizarCampanha(campanhaSelecionada, resultadoFinal, setObjetivosSelecionados, setMetasSelecionadas, setCampanhaSelecionada);
  }

  useEffect(() => {
  window.scrollTo({ top: 968, behavior: 'smooth' });
}, []);


  return (
    <>
    <div className="resultado-container">
      <h2 className="resultado-titulo">Resultado</h2>

      {/* Exibir Campanhas Salvas */}
      <label className="campanha-label">Selecione uma Campanha:</label>
      <select
       className="campanha-select"
      value={campanhaSelecionada || ''}
      onChange={(e)=> setCampanhaSelecionada(e.target.value)}>
        <option value=''>--Escolha uma Campanha--</option>
        {campanhas.map(c => 
          (<option key={c._id} value={c._id}>
            {c.nomeCampanha}
          </option>))}
      </select>

      <div className="resultado-medias">
      <p>Média Grupo 1: {medias.grupo1.toFixed(2)}</p>
      <p>Média Grupo 2: {medias.grupo2.toFixed(2)}</p>
      <p>Média Grupo 3: {medias.grupo3.toFixed(2)}</p>
      <h3 className="resultado-vencedor">Categoria vencedora: {vencedor}</h3>            
      <GraficoPizza medias={medias} />
      </div>      
    
    <ObjetivosEspecificos 
    categoria={vencedor}
    objetivos={objetivos[vencedor]}
    selecionados={objetivosSelecionados}
    onToggle={toggleObjetivo}
    />

    <MetasEspecificas 
    categoria={vencedor}
    metas={metas[vencedor]}
    selecionadas={metasSelecionadas}
    onToggle={toggleMeta}
    />

    <div className='selecionados'>
      <h4>Objetivos escolhidos:</h4>
      <ul>
        {objetivosSelecionados.map(i=>(
          <li key={i}>{objetivos[vencedor][i]}</li>
        ))}
      </ul>
      <p><strong>Metas:</strong></p>
      <ul>
        {metasSelecionadas.map(i =>(
          <li key={i}>{metas[vencedor][i]}</li>
        ))}
      </ul>
    </div>
    <button className="atualizar-campanha-btn" onClick={handleAtualizarDados}>Atualizar Campanha</button>
    </div>
    </>
  );
};

export default Resultado;
