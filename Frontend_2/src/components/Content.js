import React from 'react';

function Content() {		//da pra colocar aqui as funções relvantes do meio da página
  return (                  //texto frufru
    <main style={contentStyle}>
      <p>Bem-vindo à ExchangeRate!</p> 
    </main>
  );
}

const contentStyle = {
  padding: '2em',
  textAlign: 'center',
};

export default Content;