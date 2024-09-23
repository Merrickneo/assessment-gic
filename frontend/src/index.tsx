import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { CafePage } from './pages/CafePage';
import { EmployeePage } from './pages/EmployeePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cafes" element={<CafePage />} />
          <Route path="/employees" element={<EmployeePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </React.StrictMode>
  );
