import React, { useState, useEffect } from 'react';

function Calculator() {
    const [expenses, setExpenses] = useState([{ category: '', amount: '', currency: 'USD' }]);
    const [totalExpense, setTotalExpense] = useState(null);
    const [convertedTotal, setConvertedTotal] = useState(null);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [taxRate, setTaxRate] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleExpenseChange = (index, field, value) => {
        const newExpenses = [...expenses];
        newExpenses[index][field] = value;
        setExpenses(newExpenses);
    };

    const addExpense = () => {
        setExpenses([...expenses, { category: '', amount: '', currency: 'USD' }]);
    };

    const calculateTotal = async () => {
        try {
            const queryParams = new URLSearchParams({
                targetCurrency: toCurrency,
                tax: taxRate
            });

            const response = await fetch(`/api/expenses/calculateTotal?${queryParams}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenses),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTotalExpense(data.total_converted_amount);
            setConvertedTotal(data.final_total_with_tax);
        } catch (error) {
            console.error('Erro ao calcular o total das despesas:', error);
            setErrorMessage('Erro ao calcular o total das despesas. Tente novamente mais tarde.');
        }
    };

    const getFlagUrl = (currencyCode) => {
        if (!currencyCode) return '';
        const countryCode = currencyCode.slice(0, 2).toLowerCase();
        return `https://flagpedia.net/data/flags/h80/${countryCode}.png`;
    };

    return (
        <div style={calculatorStyle}>
            <h2 style={titleStyle}>Calculadora de Viagem</h2>
            <p style={descriptionStyle}>Use nossa calculadora para calcular os custos de sua viagem.</p>
            <div style={expensesContainerStyle}>
                {expenses.map((expense, index) => (
                    <div key={index} style={inputGroupStyle}>
                        <input
                            type="text"
                            placeholder="Categoria"
                            value={expense.category}
                            onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="number"
                            placeholder="Quantia"
                            value={expense.amount}
                            onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                            style={inputStyle}
                        />
                        <div style={inputAndFlagStyle}>
                            <img src={getFlagUrl(expense.currency)} alt="" style={flagStyle} />
                            <input
                                type="text"
                                placeholder="Moeda"
                                value={expense.currency}
                                onChange={(e) => handleExpenseChange(index, 'currency', e.target.value.toUpperCase())}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                ))}
                <button onClick={addExpense} style={buttonStyle}>Adicionar Despesa</button>
            </div>
            <div style={currencyContainerStyle}>
                <label>Moeda de Destino:</label>
                <div style={inputAndFlagStyle}>
                    <img src={getFlagUrl(toCurrency)} alt="" style={flagStyle} />
                    <input
                        type="text"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
                        style={inputStyle}
                    />
                </div>
            </div>
            <div style={currencyContainerStyle}>
                <label>Taxa (%) :</label>
                <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <button onClick={calculateTotal} style={buttonStyle}>Calcular Total</button>
            {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
            {totalExpense !== null && (
                <div style={resultStyle}>
                    <h3 style={resultTitleStyle}>Total das Despesas</h3>
                    <p>Total (sem taxas): <strong>{totalExpense} {toCurrency}</strong></p>
                    {convertedTotal !== null && <p>Total com Taxa: <strong>{convertedTotal} {toCurrency}</strong></p>}
                </div>
            )}
        </div>
    );
}

const calculatorStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '2em',
    fontFamily: '\'Roboto\', sans-serif',
    color: '#333',
    backgroundColor: '#fdfdfd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const titleStyle = {
    fontSize: '1.5em',
    marginBottom: '0.5em',
};

const descriptionStyle = {
    fontSize: '1em',
    marginBottom: '1.5em',
    color: '#555',
};

const expensesContainerStyle = {
    marginBottom: '1.5em',
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: '1em',
};

const inputStyle = {
    width: 'calc(100% - 40px)',
    padding: '0.5em',
    fontSize: '1em',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const inputAndFlagStyle = {
    display: 'flex',
    alignItems: 'center',
};

const flagStyle = {
    width: '30px',
    height: '20px',
    marginRight: '10px',
};

const buttonStyle = {
    padding: '0.75em 1.5em',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const currencyContainerStyle = {
    marginBottom: '1em',
};

const resultStyle = {
    marginTop: '2em',
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
    padding: '1.5em',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const resultTitleStyle = {
    fontSize: '1.2em',
    marginBottom: '0.5em',
};

const errorStyle = {
    color: 'red',
    marginTop: '1em',
};

export default Calculator;