// frontend/src/components/ResultsDisplay.js

import React from 'react';

function ResultsDisplay({ results }) {
    return (
        <div>
            <h2>Analysis Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
}

export default ResultsDisplay;
