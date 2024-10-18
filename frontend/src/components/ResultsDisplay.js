// frontend/src/components/ResultsDisplay.js

import React from 'react';

// Styles for the component
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #ff6f91, #ffcccb)',
    color: '#333',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
    marginBottom: '20px',
    fontSize: '2em',
    textAlign: 'center',
};

const resultsStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
    overflow: 'auto',
    transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition
};

// Hover effect
const hoverStyle = {
    ...resultsStyle,
    boxShadow: '0 8px 30px rgba(0, 0, 255, 0.5)', // Blue shadow
    transform: 'scale(1.05)', // Pop-out effect
};

function ResultsDisplay({ results }) {
    const [isHovered, setIsHovered] = React.useState(false); // State to manage hover effect

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>Analysis Results</h2>
            <div
                style={isHovered ? hoverStyle : resultsStyle} // Apply hover style conditionally
                onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
                onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
            >
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
        </div>
    );
}

export default ResultsDisplay;
