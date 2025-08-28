import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [menuAtivo, setMenuAtivo] = useState(false);

    const alternarMenu = ()=>{
        setMenuAtivo(!menuAtivo);
    }

    //fechar menu ao clicar na tela
    const fecharMenu = ()=>{
      if(menuAtivo){
        setMenuAtivo(false);
      }
    };

    useEffect(()=>{
      document.addEventListener('click', (e)=>{
        if(!e.target.closest('.navbar') && !e.target.closest('#menu-icon')){
          fecharMenu();
        }
      });
      return ()=>{
        document.removeEventListener('click', ()=>{});
      };
    },[menuAtivo]);
  return (
    <>
    <nav>
      <NavLink to='/' className='logo'><i className="ri-home-9-fill"></i><span>Torgan Soluções</span></NavLink>
      <ul className={`navbar ${menuAtivo ? 'open' : ''}`}>
        <li><NavLink to='/' className='active' onClick={fecharMenu}>Início</NavLink></li>
        <li><NavLink to='/servicos' onClick={fecharMenu}>Serviços</NavLink></li>
        <li><NavLink to='/blog' onClick={fecharMenu}>Blog</NavLink></li>
        <li><NavLink to='/contato' onClick={fecharMenu}>Contato</NavLink></li>
        <li><NavLink to='/sobre' onClick={fecharMenu}>Sobre</NavLink></li>    
      </ul>

      <div className='main'>
        <NavLink to='/login' className='user'><i className="ri-user-fill"></i>Entrar</NavLink>
        <NavLink to='/registrar'>Registrar</NavLink>
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