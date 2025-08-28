import { useState, useRef } from "react";

const useTempoEnvio = () => {
  const [tempoEnvio, setTempoEnvio] = useState({
    inicio: null,
    fim: null,
    duracao: 0,
    formatado: "00:00"
  });

  const intervaloRef = useRef(null);

  const formatarTempo = (segundos) => {
    const m = String(Math.floor(segundos / 60)).padStart(2, "0");
    const s = String(Math.floor(segundos % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

  const iniciarTempoEnvio = () => {
    const inicio = Date.now();

    setTempoEnvio({
      inicio,
      fim: null,
      duracao: 0,
      formatado: "00:00"
    });

    intervaloRef.current = setInterval(() => {
      const segundos = (Date.now() - inicio) / 1000;
      setTempoEnvio((prev) => ({
        ...prev,
        duracao: segundos,
        formatado: formatarTempo(segundos),
      }));
    }, 1000);
  };

  const pararTempoEnvio = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }

    setTempoEnvio((prev) => ({
      ...prev,
      fim: Date.now(),
    }));
  };

  return { tempoEnvio, iniciarTempoEnvio, pararTempoEnvio };
};

export default useTempoEnvio;
