import React, { useEffect, useState, useRef } from 'react'
import {perguntas} from '../../utils/perguntas'
import GrupoPerguntas from './GrupoPerguntas'
import Resultado from '../Campanha/Resultado'
import '../../styles/Campanha/MultStepForm.css'


const MultStepForm = () => {
    // 0 = Grupo1 1=Grupo2 2=Grupo3 3=Respostas
    const [currentStep, setCurrentStep] = useState(0);     
    const [respostas, setRespostas] = useState({
        grupo1: Array(perguntas.grupo1.length).fill(null),
        grupo2: Array(perguntas.grupo2.length).fill(null),
        grupo3: Array(perguntas.grupo3.length).fill(null)
    }); 

    const handleResposta = (grupo, indexPergunta, valor)=>{
        setRespostas(prev =>({
            ...prev, 
            [grupo]: prev[grupo].map((p,i)=>(i===indexPergunta ? valor :p))
        }));
    };
    
    const nextStep = () => {
      setCurrentStep(prev => prev + 1);      
    };

    const prevStep = () => {
      setCurrentStep(prev => prev - 1);      
    };    

    useEffect(()=>{
      window.scrollTo({ top: 968, behavior: 'smooth' });
    },[currentStep]);

    useEffect(()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])
     
    const grupos = ["grupo1", "grupo2", "grupo3"];
    
  return (    
     <div className='form-container'>
      <h4>Passo Atual: {currentStep + 1}</h4>      
      {currentStep < grupos.length ? (
        <>
          <GrupoPerguntas
            grupo={grupos[currentStep]}
            perguntas={perguntas[grupos[currentStep]]}
            respostas={respostas[grupos[currentStep]]}
            onResponder={handleResposta}
          />

          <div className='nav-buttons'>
            {currentStep > 0 && (
              <button
                onClick={prevStep}>
                Voltar
              </button>
            )}
            <button
              onClick={nextStep}
              disabled={respostas[grupos[currentStep]].includes(null)}>
              {currentStep === grupos.length - 1 ? "Finalizar" : "Próximo"}
            </button>
          </div>
        </>
      ) : (
        <Resultado respostas={respostas} />
      )}
      </div>    
  );
};

export default MultStepForm