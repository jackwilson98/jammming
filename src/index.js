import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import './reset.css';
import './index.css';
import App from './components/App/App';

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);