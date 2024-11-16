//essa versao é pra teoricamente poder mudar o "estado" (seções) da pagina
//é mais complicado de fazer do q parece
//caso não funcione bem, seguir os passos no site
//https://kenudeh.hashnode.dev/how-to-build-a-responsive-navigation-menu-with-react
import React, { useState } from 'react';
import './HamburgerMenu.css';

function HamburgerMenu({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = (page) => {
    setPage(page);
    toggleMenu();
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <nav className="menu">
          <button onClick={() => navigate('Home')}>Home</button>
          <button onClick={() => navigate('Exchange')}>Exchange</button>
          <button onClick={() => navigate('Sobre')}>Sobre</button>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
