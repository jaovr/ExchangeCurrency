import React from 'react';
import HamburgerMenu from './HamburguerMenu';

function Header({ setPage }) {
  return (
    <header style={headerStyle}>
      <h1>Exchange</h1>
      <HamburgerMenu setPage={setPage} />
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
