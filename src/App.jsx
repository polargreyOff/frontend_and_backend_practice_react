import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProductSearch from './components/ProductSearch';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const logged = localStorage.getItem('isLoggedIn') === 'true';
        const user = localStorage.getItem('username') || '';
        setIsLoggedIn(logged);
        setUsername(user);
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUsername(user);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
    };

    return (
        <Router basename='frontend_and_backend_practice_react'>
            <Navigation isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />

            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/technologies" element={<TechnologyList />} />
                    <Route path="/technology/:id" element={<TechnologyDetail />} />
                    <Route path="/add-technology" element={<AddTechnology />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/search" element={<ProductSearch/>} />

                    {/* защищенные маршруты */}
                    <Route
                        path="/statistics"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Statistics />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Settings setIsLoggedIn={setIsLoggedIn} />
                            </ProtectedRoute>
                        }
                    />

                    {/* fallback: можно добавить 404 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
