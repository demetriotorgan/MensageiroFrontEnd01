import '../../styles/Campanha/GrupoPerguntas.css'

const GrupoPerguntas = ({ grupo, perguntas, respostas, onResponder }) => {
  return (
    <div className="grupo-perguntas">
      <h2 className="grupo-titulo">{grupo}</h2>
      {perguntas.map((pergunta, index) => (
        <div key={index} className="pergunta-item">
          <p className="pergunta-texto">{pergunta}</p>
          <div className="opcoes">
          {[1,2,3,4,5].map(valor => (
            <button 
              key={valor} 
              onClick={() => onResponder(grupo, index, valor)}
               className={`opcao-btn ${respostas[index] === valor ? "ativo" : ""}`}
            >
              {valor}
            </button>
          ))}
        </div>
        </div>
      ))}
    </div>
  );
};

export default GrupoPerguntas;