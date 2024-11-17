import React, { useState, useEffect } from 'react';

function Conversion() {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [conversionRate, setConversionRate] = useState(null);
    const [tradingViewUrl, setTradingViewUrl] = useState('');
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

                // Save the new conversion in localStorage
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

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            const symbol = `${fromCurrency}/${toCurrency}`;
            const symbolTv = `FX:${symbol}`;
            setSymbolTv(symbolTv);
            console.log("TradingView Symbol:", symbolTv);

            const widgetUrl = `https://s3.tradingview.com/embed-widget/advanced-chart/?locale=en#${encodeURIComponent(JSON.stringify({
                theme: "light",
                style: 1,
                timezone: "Etc/UTC",
                symbol: symbolTv,
                interval: "D",
                hide_side_toolbar: false,
                allow_symbol_change: true,
                save_image: false
            }))}`;
            setTradingViewUrl(widgetUrl);
        } else {
            setTradingViewUrl('');
        }
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        // Load conversion history from localStorage on component mount
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

    return (
        <div style={conversionStyle}>
            <h2 style={titleStyle}>Conversão de Moedas</h2>
            <p style={descriptionStyle}>Aqui você pode converter as moedas que desejar</p>
            <div style={formContainerStyle}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Moeda de origem:</label>
                    <div style={inputAndFlagStyle}>
                        <img src={getFlagUrl(fromCurrency)} alt="" style={flagStyle} />
                        <input
                            type="text"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
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
                            onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
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
            {tradingViewUrl && (
                <div style={chartContainerStyle}>
                    <h3 style={resultTitleStyle}>Gráfico de Câmbio</h3>
                    <iframe
                        src={tradingViewUrl}
                        style={{ width: '100%', height: '400px', border: 'none' }}
                        allowtransparency="true"
                        frameBorder="0"
                    ></iframe>
                </div>
            )}
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

const conversionStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '2em',
    fontFamily: '\'Roboto\', sans-serif',
    color: '#333',
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

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1em',
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
    marginTop: '2em',
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