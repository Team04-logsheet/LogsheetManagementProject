import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ✅ Bootstrap CSS first
import "bootstrap/dist/css/bootstrap.min.css";
// ✅ (Optional) Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Your own global styles
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
