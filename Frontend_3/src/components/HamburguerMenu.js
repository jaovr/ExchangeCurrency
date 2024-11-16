//mudei as o nome das partes pra ficar mais de acordo com o site me vez dos genericos pra testar
//agora é pra mudar pra outras partes da pegina
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
          <button onClick={() => navigate('Conversão')}>Conversão</button>
          <button onClick={() => navigate('Calculadora')}>Calculadora</button>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
