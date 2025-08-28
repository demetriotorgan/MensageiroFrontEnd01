import { useState } from "react"
import axios from "axios";
import api from '../api/api';

const useCarregarLista = (url) =>{
 const [telefonesCarregados, setTelefonesCarregados] = useState(null);
 const [erro, setErro] = useState(null);
 const [carregandoListaJSON, setCarregandoListaJSON] = useState(false);
 const [sucesso, setSucesso] = useState(false);

 const carregarLista = async()=>{
    setCarregandoListaJSON(true);
    try {
        //1.    Buscar Lista JSON
        const response = await fetch(url);
        const data = await response.json();
        if(Array.isArray(data.telefones)){
            
            //2.Busca lista de backend
            const responseBackEnd = await axios.get(`${api.root}/listar-telefones`);
            const telefonesBackEnd = responseBackEnd.data;

            const numerosBackEnd = telefonesBackEnd.map(t => t.phone);
            
            //3. Filtra telefones ainda não salvos no backend
            const novosTelefones = data.telefones.filter(tel => !numerosBackEnd.includes(tel));

            //4.    Enviar para o backend
            if(novosTelefones.length > 0){
                try {
                await axios.post(`${api.root}/telefones/lote`,{
                    telefones:novosTelefones
                });
                setSucesso(true);
                const listaFinal = [
                    ...telefonesBackEnd
                    .filter(t=> t.status === 'nao-enviado')
                    .map(t=>t.phone),
                    ...novosTelefones
                ];
                // console.log(listaFinal);
                setTelefonesCarregados(listaFinal);
            } catch (err) {
                console.error('Erro ao salvar no banco de dados', err);
                setErro('Erro ao salvar no banco de dados');
            }
            }else{
                alert('Nenhum telefone novo para salvar');                                
                setTelefonesCarregados(null);
                const naoEnviados = telefonesBackEnd
                .filter(t => t.status === 'nao-enviado')
                .map(t => t.phone);
                    setTelefonesCarregados(naoEnviados);                    
            }            
        }else{
            setErro('Arquivo JSON inválido')
        }
    } catch (err) {
        setErro('Erro ao carregar lista');
        console.error(err);
    }finally{
        setCarregandoListaJSON(false);
    }
 };
 return {telefonesCarregados, erro, sucesso, carregandoListaJSON, carregarLista};
};

export default useCarregarLista;