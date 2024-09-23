import React from 'react';
import './App.css';
import './assets/cafe192.png';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <header className="App-header">
        <img src={require('./assets/cafe192.png')} alt="logo" />
        <h1>Assessment</h1>
      </header>
    </div>
    </QueryClientProvider>
  )
}

export default App;
