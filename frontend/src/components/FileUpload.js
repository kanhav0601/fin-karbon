// frontend/src/components/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';

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

const inputStyle = {
    marginBottom: '20px',
};

const buttonStyle = {
    backgroundColor: '#6200ea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
};

const hoverButtonStyle = {
    ...buttonStyle,
    boxShadow: '0 8px 30px rgba(0, 0, 255, 0.5)', // Blue shadow
    transform: 'scale(1.05)', // Pop-out effect
};

const resultsStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    padding: '20px',
    width: '80%',
    maxWidth: '600px',
    overflow: 'auto',
    transition: 'transform 0.3s, box-shadow 0.3s',
};

const hoverResultsStyle = {
    ...resultsStyle,
    boxShadow: '0 8px 30px rgba(0, 0, 255, 0.5)', // Blue shadow
    transform: 'scale(1.05)', // Pop-out effect
};

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false); // State to manage button hover

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('https://fin-karbon.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponse(res.data); // Save the response data
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to upload file'); // Set error message
            setResponse(null); // Clear response on error
            console.error(err); // Log the error for debugging
        }
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} style={inputStyle} />
                <button
                    type="submit"
                    style={isHovered ? hoverButtonStyle : buttonStyle} // Apply hover style conditionally
                    onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
                    onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
                >
                    Upload
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {response && (
                <div
                    style={hoverResultsStyle} // Use hover results style
                    onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
                    onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
                >
                    <h3>Results:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
