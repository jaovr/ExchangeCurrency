import React from 'react';

function Content() {		//da pra colocar aqui as funções relvantes do meio da página
  return (                  //texto frufru
    <main style={contentStyle}>
      <h2>Bem-vindo à ExchangeRate!</h2>
      <p></p>
      <h3>Nossos Destaques</h3>
      <ul>
          <li>Conversão de moedas em tempo real</li>
          <li>Calculadora financeira</li>
          <li>Gráficos</li>
          <li>Simples, rápido e gratuito</li>
        </ul>
    </main>
  );
}

const contentStyle = {
  padding: '2em',
  textAlign: 'center',
};

export default Content;