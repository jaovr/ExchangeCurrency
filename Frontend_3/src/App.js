//componente "core" que invoca os outros

import React, { useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Conversion from './components/Conversion';
import Calculator from './components/Calculator';

function App() {
  const [page, setPage] = useState('Home');

  const renderPage = () => {
    switch (page) {
      case 'Home':
        return <Content content="Bem vindo à Exchange Currency!" />;
      case 'Conversão':
        return <Conversion />;
      case 'Calculadora':
        return <Calculator />;
      default:
        return <Content content="Bem-vindo!" />;
    }
  };

  return (
    <div className="App">
      <Header setPage={setPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
