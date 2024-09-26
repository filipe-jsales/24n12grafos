import React, { useState } from 'react';
import { hungarianAlgorithm, parseInput } from './Algoritmos/aplicaHungaro';

const HungaroPage = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSolve = () => {
    try {
      const { setA, setB, costMatrix } = parseInput(inputText);
      const { result, cost } = hungarianAlgorithm(costMatrix);

      const pairs = result.map((r, i) => ({
        from: setA[i],
        to: setB[r],
        weight: costMatrix[i][r],
      }));

      setResult({ pairs, cost });
    } catch (error) {
      alert('Erro ao processar os dados. Verifique o formato da entrada.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Algoritmo Húngaro</h1>
      <textarea
        rows="10"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Insira as arestas no formato 'a b 1' por linha"
      />
      <br />
      <button onClick={handleSolve} style={{ marginTop: '10px', padding: '10px' }}>
        Resolver
      </button>

      {result && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Resultado:</h3>
          <ul>
            {result.pairs.map((pair, index) => (
              <li key={index}>
                {pair.from} - {pair.to} : {pair.weight}
              </li>
            ))}
          </ul>
          <p><strong>Custo Total Mínimo:</strong> {result.cost}</p>
        </div>
      )}
    </div>
  );
};

export default HungaroPage;
