import React from 'react';

function Header() {
  return (         //texto do header (n lembro se o nome era esse msm)
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