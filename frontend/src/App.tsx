import './App.css';
import './assets/cafe192.png';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
    const navigate = useNavigate();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <img src={require('./assets/cafe192.png')} alt="logo" />
                    <h1>Assessment</h1>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/employees')}
                            style={{ margin: '10px' }}  // Add margin for spacing
                        >
                            Go to Employees
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/cafes')}
                            style={{ margin: '10px' }}  // Add margin for spacing
                        >
                            Go to Cafes
                        </Button>
                    </div>
                </header>
            </div>

        </QueryClientProvider>
    )
}

export default App;
