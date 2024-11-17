import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Calculator() {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [{ category: '', amount: 0, currency: 'USD' }];
    const savedToCurrency = localStorage.getItem('toCurrency') || 'EUR';
    const savedTaxRate = parseFloat(localStorage.getItem('taxRate')) || 0;

    const [expenses, setExpenses] = useState(savedExpenses);
    const [totalExpense, setTotalExpense] = useState(null);
    const [convertedTotal, setConvertedTotal] = useState(null);
    const [toCurrency, setToCurrency] = useState(savedToCurrency);
    const [taxRate, setTaxRate] = useState(savedTaxRate);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('toCurrency', toCurrency);
    }, [toCurrency]);

    useEffect(() => {
        localStorage.setItem('taxRate', taxRate.toString());
    }, [taxRate]);

    const handleExpenseChange = (index, field, value) => {
        const newExpenses = [...expenses];
        newExpenses[index][field] = value;
        setExpenses(newExpenses);
    };

    const addExpense = () => {
        setExpenses([...expenses, { category: '', amount: 0, currency: 'USD' }]);
    };

    const removeExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const calculateTotal = async () => {
        try {
            const queryParams = new URLSearchParams({
                targetCurrency: toCurrency,
                tax: taxRate
            });

            const response = await axios.post(`/api/expenses/calculateTotal?${queryParams.toString()}`, expenses, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            setTotalExpense(response.data.total_converted_amount.toFixed(2));
            setConvertedTotal(response.data.final_total_with_tax.toFixed(2));
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
        <div style={styles.calculatorContainer}>
            <h2 style={styles.title}>Calculadora de Viagem</h2>
            <p style={styles.description}>Use nossa calculadora para calcular os custos de sua viagem.</p>
            <div style={styles.expensesContainer}>
                {expenses.map((expense, index) => (
                    <div key={index} style={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Categoria"
                            value={expense.category}
                            onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                            style={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Quantia"
                            value={expense.amount}
                            onChange={(e) => handleExpenseChange(index, 'amount', parseFloat(e.target.value))}
                            style={styles.input}
                        />
                        <div style={styles.inputAndFlag}>
                            <img src={getFlagUrl(expense.currency)} alt="" style={styles.flag} />
                            <input
                                type="text"
                                placeholder="Moeda"
                                value={expense.currency}
                                onChange={(e) => handleExpenseChange(index, 'currency', e.target.value.toUpperCase())}
                                style={styles.input}
                            />
                        </div>
                        <button onClick={() => removeExpense(index)} style={styles.removeButton}>Remover</button>
                    </div>
                ))}
                <button onClick={addExpense} style={styles.button}>Adicionar Despesa</button>
            </div>
            <div style={styles.currencyContainer}>
                <label>Moeda de Destino:</label>
                <div style={styles.inputAndFlag}>
                    <img src={getFlagUrl(toCurrency)} alt="" style={styles.flag} />
                    <input
                        type="text"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
                        style={styles.input}
                    />
                </div>
            </div>
            <div style={styles.currencyContainer}>
                <label>Taxa (%) :</label>
                <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                    style={styles.input}
                />
            </div>
            <button onClick={calculateTotal} style={styles.button}>Calcular Total</button>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {totalExpense !== null && (
                <div style={styles.result}>
                    <h3 style={styles.resultTitle}>Total das Despesas</h3>
                    <p>Total (sem taxas): <strong>{totalExpense} {toCurrency}</strong></p>
                    {convertedTotal !== null && <p>Total com Taxa: <strong>{convertedTotal} {toCurrency}</strong></p>}
                </div>
            )}
        </div>
    );
}

const styles = {
    calculatorContainer: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '10px',
    },
    description: {
        textAlign: 'center',
        fontSize: '16px',
        marginBottom: '20px',
    },
    expensesContainer: {
        marginBottom: '20px',
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        gap: '10px', // Adiciona espaçamento entre os campos individuais
    },
    input: {
        width: '30%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    inputAndFlag: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',  // Adiciona espaçamento entre a bandeira e o campo de entrada
    },
    flag: {
        width: '24px',
        height: '24px',
    },
    currencyContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        gap: '10px', // Adiciona espaçamento entre bandeiras e campos na seção de Moeda de Destino
    },
    result: {
        textAlign: 'center',
        marginTop: '20px',
    },
    resultTitle: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
    },
    removeButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Calculator;