// frontend/src/App.js

import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsDisplay from './components/ResultsDisplay';

function App() {
    const [results, setResults] = useState(null);

    const handleResults = (data) => {
        setResults(data);
    };

    return (
        <div className="App">
            <h1>Financial Analysis</h1>
            <FileUpload onUpload={handleResults} />
            {results && <ResultsDisplay results={results} />}
        </div>
    );
}

export default App;
