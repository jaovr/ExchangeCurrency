import React, { useState, useEffect } from 'react';

function Conversion() {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [conversionRate, setConversionRate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [symbolTv, setSymbolTv] = useState('');
    const [conversionHistory, setConversionHistory] = useState([]);

    const handleConversion = async () => {
        try {
            const response = await fetch(`/api/conversion/rate/pair/${fromCurrency}/${toCurrency}/${amount}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                setConversionResult(data.conversion_result);
                setConversionRate(data.conversion_rate);

                const newConversion = {
                    fromCurrency,
                    toCurrency,
                    amount,
                    conversionRate: data.conversion_rate,
                    conversionResult: data.conversion_result,
                    timestamp: new Date().toLocaleString()
                };

                const updatedHistory = [...conversionHistory, newConversion];
                setConversionHistory(updatedHistory);
                localStorage.setItem('conversionHistory', JSON.stringify(updatedHistory));
            } else {
                const text = await response.text();
                console.error('Response is not JSON:', text);
            }
        } catch (error) {
            console.error('Erro ao buscar a taxa de conversão:', error);
            setErrorMessage('Erro ao buscar a taxa de conversão. Tente novamente mais tarde.');
        }
    };

    const validCurrencyCode = (code) => code && typeof code === 'string' && code.trim().length === 3;

    const updateSymbolTv = (from, to) => {
        if (validCurrencyCode(from) && validCurrencyCode(to) && from !== to) {
            const symbol = `${from.trim().toUpperCase()}${to.trim().toUpperCase()}`;
            setSymbolTv(symbol);
        } else {
            setSymbolTv('');
        }
    };

    // Update symbolTv whenever fromCurrency or toCurrency changes
    useEffect(() => {
        updateSymbolTv(fromCurrency, toCurrency);
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        const history = localStorage.getItem('conversionHistory');
        if (history) {
            setConversionHistory(JSON.parse(history));
        }
    }, []);

    const getFlagUrl = (currencyCode) => {
        if (!currencyCode) return '';
        const countryCode = currencyCode.slice(0, 2).toLowerCase();
        return `https://flagpedia.net/data/flags/h80/${countryCode}.png`;
    };

    const handleFromCurrencyChange = (e) => {
        const value = e.target.value.toUpperCase();
        if (value.length <= 3) {
            setFromCurrency(value);
        }
    };

    const handleToCurrencyChange = (e) => {
        const value = e.target.value.toUpperCase();
        if (value.length <= 3) {
            setToCurrency(value);
        }
    };

    const tradingViewUrl = (symbol) => {
        return `https://s.tradingview.com/widgetembed/?hideideas=1&locale=en#%7B%22symbol%22%3A%22${symbol}%22%2C%22interval%22%3A%221%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22UTC%22%2C%22withdateranges%22%3A%221%22%7D`;
    };

    return (
        <div style={mainContainerStyle}>
            <h2 style={titleStyle}>Conversão de Moedas</h2>
            <p style={descriptionStyle}>Aqui você pode converter as moedas que desejar</p>
            <div style={contentContainerStyle}>
                <div style={leftContainerStyle}>
                    <div style={formContainerStyle}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Moeda de origem:</label>
                            <div style={inputAndFlagStyle}>
                                <img src={getFlagUrl(fromCurrency)} alt="" style={flagStyle} />
                                <input
                                    type="text"
                                    value={fromCurrency}
                                    onChange={handleFromCurrencyChange}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Moeda de destino:</label>
                            <div style={inputAndFlagStyle}>
                                <img src={getFlagUrl(toCurrency)} alt="" style={flagStyle} />
                                <input
                                    type="text"
                                    value={toCurrency}
                                    onChange={handleToCurrencyChange}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Quantia:</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <button onClick={handleConversion} style={buttonStyle}>Converter</button>
                    </div>
                    {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
                    {conversionResult !== null && (
                        <div style={resultStyle}>
                            <h3 style={resultTitleStyle}>Resultado da Conversão</h3>
                            <p>Taxa de Conversão: <strong>{conversionRate}</strong></p>
                            <p>Resultado da Conversão: <strong>{conversionResult}</strong></p>
                        </div>
                    )}
                </div>
                {symbolTv && (
                    <div style={rightContainerStyle}>
                        <div style={chartContainerStyle}>
                            <h3 style={resultTitleStyle}>Gráfico de Câmbio</h3>
                            <iframe
                                src={tradingViewUrl(symbolTv)}
                                width="100%"
                                height="400"
                                frameBorder="0"
                                allowtransparency="true"
                                scrolling="no"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                )}
            </div>
            {conversionHistory.length > 0 && (
                <div style={historyContainerStyle}>
                    <h3 style={resultTitleStyle}>Histórico de Conversões</h3>
                    <ul style={historyListStyle}>
                        {conversionHistory.map((entry, index) => (
                            <li key={index} style={historyItemStyle}>
                                <p><strong>{entry.timestamp}</strong></p>
                                <p>{entry.amount} {entry.fromCurrency} para {entry.toCurrency}</p>
                                <p>Taxa de Conversão: {entry.conversionRate}</p>
                                <p>Resultado: {entry.conversionResult}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const mainContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2em',
    fontFamily: '\'Roboto\', sans-serif',
    color: '#333',
};

const titleStyle = {
    fontSize: '1.5em',
    marginBottom: '0.5em',
    textAlign: 'center',
};

const descriptionStyle = {
    fontSize: '1em',
    marginBottom: '1.5em',
    color: '#555',
    textAlign: 'center',
};

const contentContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2em',
};

const leftContainerStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const rightContainerStyle = {
    flex: '1',
};

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
    width: '100%',
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
};

const labelStyle = {
    marginBottom: '0.5em',
    fontSize: '0.9em',
    color: '#555',
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

const chartContainerStyle = {
    textAlign: 'left',
    backgroundColor: '#f5f5f5',
    padding: '1.5em',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const errorStyle = {
    color: 'red',
    marginTop: '1em',
};

const historyContainerStyle = {
    marginTop: '2em',
    textAlign: 'left',
    backgroundColor: '#f0f0f0',
    padding: '1em',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const historyListStyle = {
    listStyleType: 'none',
    padding: 0,
};

const historyItemStyle = {
    marginBottom: '1em',
    padding: '0.5em',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
};

export default Conversion;