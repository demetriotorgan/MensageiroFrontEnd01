import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Layout from './components/Layout'
import Servicos from './components/Servicos'
import Blog from './components/Blog'
import Contato from './components/Contato'
import Sobre from './components/Sobre'
import Dashboard from './components/Dashboard'
import TelaLogin from './components/TelaLogin'
import Registrar from './components/Registrar'
import EnviarMensagem from './components/EnviarMensagem'
import EnviarImagem from './components/EnviarImagem'
import EnviarImagemContato from './components/EnviarImagemContato'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Dashboard />} /> 
            <Route path='servicos' element={<Servicos />}/>
            <Route path='blog' element={<Blog />}/>
            <Route path='contato' element={<Contato />}/>
            <Route path='sobre' element={<Sobre />}/>
            <Route path='login' element={<TelaLogin />}/>
            <Route path='registrar' element={<Registrar />}/>            
            <Route path='enivar-mensagem' element={<EnviarMensagem />}/>
            <Route path='enivar-imagem' element={<EnviarImagem />}/>
            <Route path='enviar-imagem-contato' element={<EnviarImagemContato />}/>
          </Route>
        </Routes>
      </BrowserRouter>      
    </>
  )
}

export default App
