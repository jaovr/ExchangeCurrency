import React from 'react';

function Calculator() {
  return (
    <div style={calculatorStyle}>
      <h2>Calculadora</h2>
      <p>Use nossa calculadora para calcular os custos de sua viagem.</p>
    </div>
    //deve mais ou menos o msm esquema da conversao
  );
}

const calculatorStyle = {
  textAlign: 'center',
  padding: '2em',
};

export default Calculator;
