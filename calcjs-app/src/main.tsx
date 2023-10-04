import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { JssProvider } from 'react-jss';
import './main.css';
import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <JssProvider id={{ minify: import.meta.env.PROD }}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </JssProvider>
  </StrictMode>,
);
