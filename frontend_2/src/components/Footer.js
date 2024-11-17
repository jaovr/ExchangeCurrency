import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Exchange. Todos os direitos reservados.</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: 'white',
  textAlign: 'center',
  padding: '1em 0',
  position: 'fixed',
  bottom: '0',
  width: '100%',
};

export default Footer;