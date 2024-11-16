import React from 'react';

function Conversion() {
  return (
    <div style={conversionStyle}>
      <h2>Conversão de moedas</h2>
      <p>Aqui você pode converter as moedas que desejar</p>
    </div>
    //Aí acredito eu que aquii a gente cria outra div pra colocar o conversor da API
  );
}

const conversionStyle = {
  textAlign: 'center',
  padding: '2em',
};

export default Conversion;
