import React from 'react';
import HamburgerMenu from './HamburguerMenu'; // Certifique-se de que o caminho esteja correto

function Header() {
  return (
      <header style={headerStyle}>
        <h1>ExchangeCurrency</h1>
        <HamburgerMenu />
      </header>
  );
}

const headerStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  textAlign: 'center',
  padding: '1em 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '1em',
  paddingRight: '1em',
};

export default Header;
