import React, { useState } from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
    const [menuAtivo, setMenuAtivo] = useState(false);

    const alternarMenu = ()=>{
        setMenuAtivo(!menuAtivo);
    }
  return (
    <>
    <nav>
      <a className='logo'><i class="ri-home-9-fill"></i><span>Logo</span></a>
      <ul className={`navbar ${menuAtivo ? 'open' : ''}`}>
        <li><a className='active'>Início</a></li>
        <li><a>Sobre</a></li>
        <li><a>Serviços</a></li>
        <li><a>Blog</a></li>
        <li><a>Contato</a></li>    
      </ul>

      <div className='main'>
        <a className='user'><i class="ri-user-fill"></i>Entrar</a>
        <a>Registrar</a>
        <div 
            className={`bx bx-menu ${menuAtivo ? 'bx-x':''}`}
            id='menu-icon'
            onClick={alternarMenu}
            >
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar